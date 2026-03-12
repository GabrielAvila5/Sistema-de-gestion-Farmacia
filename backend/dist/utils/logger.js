"use strict";
/**
 * @fileoverview Configuración global del logger de la aplicación utilizando Winston.
 * Centraliza los logs con transportes para consola (desarrollo) y archivo (producción/errores).
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
// Definir los niveles de severidad
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
// Establecer el nivel dependiendo del entorno
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
// Colores personalizados
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};
winston_1.default.addColors(colors);
// Formato de los logs
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.default.format.errors({ stack: true }), // Captura automáticamente los stack traces
winston_1.default.format.printf((info) => {
    const { timestamp, level, message, stack, ...meta } = info;
    const metaString = Object.keys(meta).length ? `\nContext: ${JSON.stringify(meta, null, 2)}` : '';
    return `[${timestamp}] ${level}: ${message}${stack ? `\nStack: ${stack}` : ''}${metaString}`;
}));
// Formulario para consola (coloreado)
const consoleFormat = winston_1.default.format.combine(winston_1.default.format.colorize({ all: true }), format);
// Transportes: lugares donde se guardarán los logs
const transports = [
    // Consola para modo de desarrollo
    new winston_1.default.transports.Console({
        format: consoleFormat,
    }),
    // Archivo exclusivamente para errores
    new winston_1.default.transports.File({
        filename: path_1.default.join(__dirname, '../../logs/error.log'),
        level: 'error',
        format: format,
    }),
    // Archivo con todos los logs (opcional, para auditoría general)
    new winston_1.default.transports.File({
        filename: path_1.default.join(__dirname, '../../logs/all.log'),
        format: format,
    }),
];
// Crear y exportar la instancia del logger
const logger = winston_1.default.createLogger({
    level: level(),
    levels,
    format,
    transports,
});
exports.default = logger;
//# sourceMappingURL=logger.js.map