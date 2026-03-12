"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Servicio que encapsula la lógica de negocio y consultas a la base de datos para la entidad de Pdf.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const PdfPrinter = require('pdfmake/js/printer').default || require('pdfmake/js/printer');
// Fuentes genéricas
const fonts = {
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    }
};
const printer = new PdfPrinter(fonts);
class PdfService {
    /**
     * Genera un buffer PDF usando la librería pdfmake para recetas médicas.
     */
    async generatePrescription(data) {
        return new Promise((resolve, reject) => {
            try {
                // Alergias format
                let allergiesText = 'Sin alergias conocidas';
                if (data.patientAllergies) {
                    allergiesText = `ALERGIAS: ${data.patientAllergies}`;
                }
                const docDefinition = {
                    defaultStyle: {
                        font: 'Helvetica'
                    },
                    content: [
                        // Cabecera Clínica Muestra (Simulando Logo con Texto y Color)
                        { text: 'FarmaGestión Clínica', style: 'header', alignment: 'center', color: '#10b981' },
                        { text: 'Receta Médica Oficial', style: 'subheader', alignment: 'center', margin: [0, 0, 0, 5] },
                        { text: `Folio de Consulta: ${data.consultationId ? `#${data.consultationId}` : 'N/A'}`, alignment: 'center', fontSize: 10, color: 'gray', margin: [0, 0, 0, 15] },
                        // Datos Médico
                        {
                            columns: [
                                { text: `Doctor: Dr(a). ${data.doctorName}`, bold: true },
                                { text: `Fecha: ${new Date().toLocaleDateString()}`, alignment: 'right' }
                            ]
                        },
                        { text: `Cédula Profesional: ${data.doctorLicense || 'N/A'}`, margin: [0, 2, 0, 10] },
                        // Datos Paciente
                        { text: 'Datos del Paciente', style: 'sectionHeader', margin: [0, 10, 0, 5] },
                        {
                            columns: [
                                { text: `Nombre: ${data.patientName}` },
                                { text: `Expediente: ${data.patientCode || 'N/A'}` },
                                { text: `Edad: ${data.patientAge ? `${data.patientAge} años` : 'N/A'}`, alignment: 'right' }
                            ]
                        },
                        {
                            text: allergiesText,
                            color: data.patientAllergies ? 'red' : 'gray',
                            bold: !!data.patientAllergies,
                            margin: [0, 5, 0, 15]
                        },
                        // Diagnostico
                        { text: `Diagnóstico Presuntivo/Definitivo: \n ${data.diagnosis}`, margin: [0, 5, 0, 20], italics: true },
                        // Tratamiento
                        { text: 'Indicaciones y Tratamiento:', style: 'sectionHeader', margin: [0, 10, 0, 10] },
                        { text: data.treatment, margin: [0, 0, 0, 80] },
                        // Footer / Firmas
                        { text: '__________________________________', alignment: 'center', margin: [0, 60, 0, 5] },
                        { text: 'Firma y Sello del Médico', alignment: 'center', fontSize: 10 }
                    ],
                    styles: {
                        header: { fontSize: 22, bold: true, margin: [0, 0, 0, 5] },
                        subheader: { fontSize: 14, color: '#555555' },
                        sectionHeader: { fontSize: 15, bold: true, color: '#2B579A' }
                    }
                };
                const pdfDoc = printer.createPdfKitDocument(docDefinition);
                const chunks = [];
                pdfDoc.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                pdfDoc.on('end', () => {
                    resolve(Buffer.concat(chunks));
                });
                pdfDoc.on('error', (err) => {
                    reject(err);
                });
                pdfDoc.end();
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = new PdfService();
//# sourceMappingURL=PdfService.js.map