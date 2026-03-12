/**
 * @fileoverview Página de nueva consulta médica.
 * Carga los datos del paciente desde la URL y muestra el formulario de consulta
 * con una cabecera sticky que permite al médico confirmar la identidad del paciente.
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientById, type Patient } from './patientsApi';
import ConsultationFormModal from './components/ConsultationFormModal';
import { Loader2, ArrowLeft, UserCircle, AlertTriangle, Calendar, Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function NewConsultationPage() {
    const { patientId } = useParams<{ patientId: string }>();
    const navigate = useNavigate();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);
    const [isConsultationOpen, setIsConsultationOpen] = useState(false);

    useEffect(() => {
        const loadPatient = async () => {
            const id = Number(patientId);
            if (!patientId || isNaN(id)) {
                toast.error('ID de paciente inválido.');
                navigate('/pacientes', { replace: true });
                return;
            }

            try {
                setLoading(true);
                const data = await getPatientById(id);
                setPatient(data);
                // Abrir el modal de consulta automáticamente una vez cargado el paciente
                setIsConsultationOpen(true);
            } catch (err: any) {
                toast.error(err.response?.data?.message || 'No se pudo cargar el paciente. Verifique que el ID sea correcto.');
                navigate('/pacientes', { replace: true });
            } finally {
                setLoading(false);
            }
        };

        loadPatient();
    }, [patientId, navigate]);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (!patient) return null;

    const patientAge = Math.floor(
        (Date.now() - new Date(patient.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    );

    return (
        <div className="animate-fade-in space-y-4">
            {/* ── Breadcrumb ── */}
            <button
                type="button"
                onClick={() => navigate('/pacientes')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Volver a Expedientes
            </button>

            {/* ══════ Sticky Patient Header ══════ */}
            <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    {/* Datos del Paciente */}
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center shrink-0">
                            <UserCircle className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-foreground">
                                {patient.first_name} {patient.last_name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded-md">
                                    {patient.patient_code || 'S/C'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(patient.date_of_birth).toLocaleDateString()} ({patientAge} años)
                                </span>
                                {patient.phone && (
                                    <span className="flex items-center gap-1">
                                        <Phone className="w-3.5 h-3.5" />
                                        {patient.phone}
                                    </span>
                                )}
                                {patient.gender && <span>{patient.gender}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Alerta de Alergias (siempre visible si tiene) */}
                    {patient.has_allergies && patient.allergies_detail && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-red-950/50 border border-red-500/40 text-red-300 rounded-lg text-sm font-medium shrink-0 max-w-sm">
                            <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
                            <div>
                                <span className="font-bold text-xs uppercase tracking-wider block">Alergias</span>
                                <span className="text-red-200 text-xs">{patient.allergies_detail}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ══════ Contenido Principal ══════ */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-2">Nueva Consulta Médica</h2>
                <p className="text-sm text-muted-foreground mb-4">
                    Complete el formulario de consulta para este paciente. Los datos se guardarán en su expediente digital.
                </p>
                <button
                    onClick={() => setIsConsultationOpen(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-all shadow-sm"
                >
                    Abrir Formulario de Consulta
                </button>
            </div>

            {/* Formulario de Consulta (Modal reutilizado) */}
            <ConsultationFormModal
                open={isConsultationOpen}
                onClose={() => setIsConsultationOpen(false)}
                patientId={patient.id}
                patientName={`${patient.first_name} ${patient.last_name}`}
                patientCode={patient.patient_code}
                patientAllergies={patient.has_allergies ? patient.allergies_detail : null}
                onSuccess={() => {
                    // Recargar datos del paciente para ver la consulta nueva en el historial
                    toast.success('Consulta guardada. Puede imprimir la receta o cerrar el formulario.');
                }}
            />
        </div>
    );
}
