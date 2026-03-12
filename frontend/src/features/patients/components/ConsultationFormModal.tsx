import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import { toast } from 'sonner';
import { Loader2, Save, Printer, Search, Pill, AlertTriangle } from 'lucide-react';
import { createConsultation, searchProductsForConsultation, generatePrescriptionPdf } from '../consultationApi';
import { useAuth } from '@/contexts/AuthContext';

interface PrescribedMedication {
    id: number;
    name: string;
    dose: string;
    duration: string;
    additional_instructions: string;
    hasStock: boolean;
}


interface ConsultationFormModalProps {
    open: boolean;
    onClose: () => void;
    patientId: number;
    patientName: string;
    patientCode?: string;
    patientAllergies: string | null;
    onSuccess: () => void;
}

export default function ConsultationFormModal({ open, onClose, patientId, patientName, patientCode, patientAllergies, onSuccess }: ConsultationFormModalProps) {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Formulario principal
    const { register, handleSubmit, watch, reset } = useForm();
    
    // IMC Computed Property
    const weight = watch('weight');
    const height = watch('height');
    const computedBmi = (weight && height && Number(height) > 0) 
        ? (Number(weight) / Math.pow(Number(height), 2)).toFixed(2) 
        : '';

    // Buscador de Farmacia y Carrito de Receta
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [prescribedMedications, setPrescribedMedications] = useState<PrescribedMedication[]>([]);
    
    // Estado para "Agregar Medicamento" emergente en la tabla de búsqueda
    const [activeMedicationDraft, setActiveMedicationDraft] = useState<Partial<PrescribedMedication> | null>(null);

    useEffect(() => {
        // Debounce simple
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm.length >= 2) {
                setIsSearching(true);
                try {
                    const results = await searchProductsForConsultation(searchTerm);
                    setSearchResults(results);
                } catch (error) {
                    console.error('Error buscando productos', error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // Último payload guardado temporalmente para imprimir la receta post-guardado
    const [lastConsultationId, setLastConsultationId] = useState<number | null>(null);
    const [savedData, setSavedData] = useState<any>(null);

    const handleAddMedicationToPrescription = (medication: PrescribedMedication) => {
        setPrescribedMedications(prev => [...prev, medication]);
        setActiveMedicationDraft(null);
        setSearchTerm('');
        setSearchResults([]);
        toast.success(`Medicamento ${medication.name} añadido a la receta.`);
    };

    const handleRemoveMedication = (index: number) => {
        setPrescribedMedications(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data: any) => {
        try {
            setIsSubmitting(true);
            const payload = {
                ...data,
                patient_id: patientId,
                doctor_id: user?.id || 1, // Fallback en caso de que falte context
                temperature: data.temperature ? Number(data.temperature) : undefined,
                weight: data.weight ? Number(data.weight) : undefined,
                height: data.height ? Number(data.height) : undefined,
                bmi: computedBmi ? Number(computedBmi) : undefined,
                abdominal_circ: data.abdominal_circ ? Number(data.abdominal_circ) : undefined,
            };

            // Concatenar medicamentos al tratamiento para guardarlo en la Base de Datos
            let finalTreatment = data.treatment ? data.treatment + '\n\n' : '';
            if (prescribedMedications.length > 0) {
                finalTreatment += 'RECETA FARMACOLÓGICA:\n';
                prescribedMedications.forEach((med, i) => {
                    finalTreatment += `${i + 1}. ${med.name} — ${med.dose} por ${med.duration}`;
                    if (med.additional_instructions) finalTreatment += ` (${med.additional_instructions})`;
                    finalTreatment += '\n';
                });
            }
            payload.treatment = finalTreatment;

            const response = await createConsultation(payload);
            setLastConsultationId(response.id);
            setSavedData(payload); // Para imprimir PDF
            
            toast.success('Consulta registrada exitosamente');
            onSuccess();
            // No cerramos el modal aún, por si quiere imprimir
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al guardar la consulta');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePrintPrescription = async () => {
        if (!savedData) return;
        try {
            // Se calcula edad (aproximada si no tenemos DOB aquí, omitimos por ahora o requeriríamos DOB en props)
            const pdfPayload = {
                doctorName: user?.name,
                patientName: patientName,
                patientCode: patientCode,
                patientAllergies: patientAllergies,
                diagnosis: savedData.diagnosis,
                treatment: savedData.treatment, // Ya trae concatenada la lista desde onSubmit
                consultationId: lastConsultationId
            };
            
            const pdfBlob = await generatePrescriptionPdf(pdfPayload);
            const url = window.URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
            
            // Abre en nueva pestaña o manda a imprimir
            const printWindow = window.open(url);
            if (printWindow) {
                printWindow.onload = () => {
                    printWindow.print();
                };
            }
        } catch (error) {
            toast.error('No se pudo generar la recta');
        }
    };

    const handleClose = () => {
        reset();
        setLastConsultationId(null);
        setSavedData(null);
        setSearchTerm('');
        setSearchResults([]);
        setPrescribedMedications([]);
        setActiveMedicationDraft(null);
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose} title="Registro de Consulta Médica">
            <div className="space-y-6">
                
                {patientAllergies && (
                    <div className="mb-4 flex items-start gap-3 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg animate-fade-in shadow-sm">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-sm">¡Alerta de Alergias!</p>
                            <p className="text-sm">{patientAllergies}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Triage / Signos Vitales */}
                    <div>
                        <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Signos Vitales</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground font-medium">Temp. (°C)</label>
                                <input type="number" step="0.1" {...register('temperature')} className="w-full px-2 py-1.5 bg-background border border-border rounded-md text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="36.5" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground font-medium">Peso (kg)</label>
                                <input type="number" step="0.1" {...register('weight')} className="w-full px-2 py-1.5 bg-background border border-border rounded-md text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="70" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground font-medium">Altura (m)</label>
                                <input type="number" step="0.01" {...register('height')} className="w-full px-2 py-1.5 bg-background border border-border rounded-md text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="1.75" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground font-medium font-bold text-primary">IMCCalculado</label>
                                <input type="text" readOnly value={computedBmi} className="w-full px-2 py-1.5 bg-muted border-none rounded-md text-sm text-center font-semibold text-primary/80" placeholder="—" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground font-medium">Circ. Abd. (cm)</label>
                                <input type="number" step="0.1" {...register('abdominal_circ')} className="w-full px-2 py-1.5 bg-background border border-border rounded-md text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="85" />
                            </div>
                        </div>
                    </div>

                    {/* Evolución Médica */}
                    <div>
                        <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Datos Clínicos</h3>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Diagnóstico *</label>
                                <textarea {...register('diagnosis', { required: 'El diagnóstico es requerido' })} rows={2} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/50 outline-none resize-none" placeholder="Detalle el diagnóstico clínico..."></textarea>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Indicaciones Generales (Tratamiento No Farmacológico)</label>
                                <textarea {...register('treatment')} rows={3} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/50 outline-none resize-y" placeholder="Ej: Reposo en cama, dieta blanda..."></textarea>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground">Notas Adicionales (Privado)</label>
                                <textarea {...register('notes')} rows={2} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/50 outline-none resize-none" placeholder="Observaciones exclusivas del expediente..."></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Stock de Farmacia en Vivo y Recetario */}
                    <div className="p-4 bg-muted/40 rounded-xl border border-border/50 space-y-4">
                        <div className="flex items-center gap-2 text-secondary-foreground font-medium text-sm">
                            <Search className="w-4 h-4 text-primary" /> Agregar Medicamentos a la Receta
                        </div>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Escriba un medicamento para recetar e inspeccionar stock..."
                                className="w-full pl-3 pr-10 py-2 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                                disabled={!!lastConsultationId || activeMedicationDraft !== null}
                            />
                            {isSearching && <Loader2 className="absolute right-3 top-2.5 w-4 h-4 animate-spin text-muted-foreground" />}
                        </div>
                        
                        {/* Resultados de Farmacia */}
                        {searchResults.length > 0 && !activeMedicationDraft && (
                            <div className="mt-2 text-sm grid gap-1 relative z-10 max-h-40 overflow-y-auto w-full bg-card border border-border rounded-lg shadow-sm">
                                {searchResults.map((product) => (
                                    <div key={product.id} className="flex justify-between items-center py-2 px-3 hover:bg-muted cursor-pointer" onClick={() => setActiveMedicationDraft({ id: product.id, name: product.name, hasStock: product.totalStock > 0 })}>
                                        <span className="font-medium flex items-center gap-2"><Pill className="w-4 h-4 text-primary"/> {product.name}</span>
                                        {product.totalStock > 0 ? (
                                            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Stock: {product.totalStock}</span>
                                        ) : (
                                            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-bold">Sin Stock</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Formulario Draft de Medicamento */}
                        {activeMedicationDraft && (
                            <div className="bg-card border border-primary/20 rounded-lg p-3 space-y-3 mt-2">
                                <div className="flex justify-between items-center border-b border-border pb-2">
                                    <div className="font-bold text-sm text-primary flex items-center gap-2">
                                        <Pill className="w-4 h-4"/> Configurar Dosis: {activeMedicationDraft.name}
                                    </div>
                                    {!activeMedicationDraft.hasStock && (
                                        <span className="text-xs text-orange-600 font-semibold px-2 py-1 bg-orange-100 rounded-md">⚠️ Avisar al paciente: Sin stock local</span>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Dosis (ej: 1 Tableta c/8 hrs) *</label>
                                        <input type="text" id="draft-dose" className="w-full px-2 py-1.5 bg-background border border-border rounded-md text-sm outline-none focus:ring-1 focus:ring-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Duración (ej: Por 5 días) *</label>
                                        <input type="text" id="draft-duration" className="w-full px-2 py-1.5 bg-background border border-border rounded-md text-sm outline-none focus:ring-1 focus:ring-primary" />
                                    </div>
                                    <div className="space-y-1 col-span-2">
                                        <label className="text-xs font-medium">Indicación adicional (Opcional)</label>
                                        <input type="text" id="draft-instructions" className="w-full px-2 py-1.5 bg-background border border-border rounded-md text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="Ej: Tomar después del desayuno" />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <button type="button" onClick={() => setActiveMedicationDraft(null)} className="px-3 py-1 text-xs font-medium hover:bg-muted border border-border rounded-md">Cancelar</button>
                                    <button type="button" onClick={() => {
                                        const dose = (document.getElementById('draft-dose') as HTMLInputElement).value;
                                        const duration = (document.getElementById('draft-duration') as HTMLInputElement).value;
                                        const extra = (document.getElementById('draft-instructions') as HTMLInputElement).value;
                                        if(!dose || !duration) return toast.error('Dosis y duración son requeridas');
                                        
                                        handleAddMedicationToPrescription({
                                            id: activeMedicationDraft.id!,
                                            name: activeMedicationDraft.name!,
                                            hasStock: activeMedicationDraft.hasStock!,
                                            dose,
                                            duration,
                                            additional_instructions: extra
                                        });
                                    }} className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-md">Confirmar Prescripción</button>
                                </div>
                            </div>
                        )}

                        {/* Carrito de Receta Actual */}
                        {prescribedMedications.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-border">
                                <h4 className="text-sm font-semibold mb-2">Medicamentos Prescritos ({prescribedMedications.length})</h4>
                                <ul className="space-y-2">
                                    {prescribedMedications.map((med, i) => (
                                        <li key={i} className="flex justify-between items-start bg-background border border-border p-2 rounded-lg text-sm">
                                            <div>
                                                <p className="font-semibold text-primary">{med.name} {!med.hasStock && <span className="text-orange-500 font-normal ml-1 text-xs">(Avisar: Sin Stock)</span>}</p>
                                                <p className="text-muted-foreground text-xs mt-0.5">Dosis: {med.dose} | {med.duration}</p>
                                                {med.additional_instructions && <p className="text-muted-foreground text-xs italic mt-0.5">Nota: {med.additional_instructions}</p>}
                                            </div>
                                            {!lastConsultationId && (
                                                <button type="button" onClick={() => handleRemoveMedication(i)} className="text-red-500 hover:text-red-700 text-xs px-2 py-1">Quitar</button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
                        {!lastConsultationId ? (
                            <>
                                <button type="button" onClick={handleClose} className="px-5 py-2 text-sm font-medium border border-border hover:bg-muted rounded-xl transition-colors">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95">
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Guardar Expediente
                                </button>
                            </>
                        ) : (
                            <>
                                <button type="button" onClick={handlePrintPrescription} className="flex items-center gap-2 px-6 py-2 bg-sky-600 text-white text-sm font-medium rounded-xl hover:bg-sky-700 transition-all shadow-md active:scale-95">
                                    <Printer className="w-4 h-4" />
                                    Imprimir Receta
                                </button>
                                <button type="button" onClick={handleClose} className="px-5 py-2 text-sm font-medium bg-muted hover:bg-muted/80 rounded-xl transition-colors">
                                    Cerrar Formulario
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </Modal>
    );
}
