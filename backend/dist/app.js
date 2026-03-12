"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Configuración principal de la aplicación Express, middlewares globales y montaje de rutas.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
// Dependencias principales: Express, CORS, Helmet (seguridad) y Morgan (logs HTTP)
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// Middleware global para manejar errores
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
// Rutas de productos y ventas
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const saleRoutes_1 = __importDefault(require("./routes/saleRoutes"));
// Rutas de autenticación
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Rutas Clínicas nuevas
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const prescriptionRoutes_1 = __importDefault(require("./routes/prescriptionRoutes"));
// Rutas de Estadísticas Generales
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
// Rutas de Gestión de Usuarios
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// Rutas de Consultas del Expediente Clínico
const consultationRoutes_1 = __importDefault(require("./routes/consultationRoutes"));
// Rutas de Proveedores
const supplierRoutes_1 = __importDefault(require("./routes/supplierRoutes"));
// Rutas de Órdenes de Compra
const purchaseOrderRoutes_1 = __importDefault(require("./routes/purchaseOrderRoutes"));
// Rutas de Movimientos de Inventario
const stockRoutes_1 = __importDefault(require("./routes/stockRoutes"));
// Crea la instancia de la aplicación Express
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parsea el cuerpo de las peticiones como JSON
// Habilita CORS configurado con el origen desde las variables de entorno, o con un default
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use((0, cors_1.default)({
    origin: corsOrigin,
    credentials: true,
}));
app.use((0, helmet_1.default)()); // Agrega cabeceras HTTP de seguridad
app.use((0, morgan_1.default)('dev')); // Registra cada petición HTTP en consola (modo desarrollo)
// Routes
app.use('/api/auth', authRoutes_1.default); // Rutas de autenticación
app.use('/api/products', productRoutes_1.default); // Rutas para gestión de productos
app.use('/api/sales', saleRoutes_1.default); // Rutas para gestión de ventas
app.use('/api/patients', patientRoutes_1.default); // Rutas para gestión de pacientes
app.use('/api/appointments', appointmentRoutes_1.default); // Rutas para gestión de citas
app.use('/api/prescriptions', prescriptionRoutes_1.default); // Generador de recetas PDF
app.use('/api/dashboard', dashboardRoutes_1.default); // Panel de Estadísticas Generales
app.use('/api/users', userRoutes_1.default); // Gestión de Usuarios
app.use('/api/consultations', consultationRoutes_1.default); // Expediente Cronológico
app.use('/api/suppliers', supplierRoutes_1.default); // Gestión de Proveedores
app.use('/api/purchase-orders', purchaseOrderRoutes_1.default); // Gestión de Órdenes de Compra
app.use('/api/stock', stockRoutes_1.default); // Movimientos y Ajustes de Inventario
// Ruta raíz: confirma que la API está activa
app.get('/', (_req, res) => {
    res.send('API is running...');
});
// Error Handler: captura cualquier error lanzado en las rutas y lo formatea
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map