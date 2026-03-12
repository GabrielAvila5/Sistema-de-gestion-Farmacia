export interface PrescriptionData {
    doctorName: string;
    doctorLicense?: string | null;
    patientName: string;
    patientCode?: string | null;
    patientAge?: number | null;
    patientAllergies?: string | null;
    diagnosis: string;
    treatment: string;
    consultationId?: number;
}
declare class PdfService {
    /**
     * Genera un buffer PDF usando la librería pdfmake para recetas médicas.
     */
    generatePrescription(data: PrescriptionData): Promise<Buffer>;
}
declare const _default: PdfService;
export default _default;
//# sourceMappingURL=PdfService.d.ts.map