"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrescriptionPdf = void 0;
const PdfService_1 = __importDefault(require("../services/PdfService"));
const generatePrescriptionPdf = async (req, res, next) => {
    try {
        const data = req.body;
        // Generar el Buffer del PDF
        const pdfBuffer = await PdfService_1.default.generatePrescription(data);
        // Configurar Headers para retorno binario (MIME type PDF)
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="receta_medica.pdf"');
        // Usamos 'inline' para sugerirle al navegador que lo muestre si puede, 
        // usar 'attachment' forzaría la descarga automática.
        // Enviar el ArrayBuffer directamente a la red
        res.send(pdfBuffer);
    }
    catch (error) {
        next(error);
    }
};
exports.generatePrescriptionPdf = generatePrescriptionPdf;
//# sourceMappingURL=prescriptionController.js.map