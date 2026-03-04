// Dependencias principales: Express, CORS, Helmet (seguridad) y Morgan (logs HTTP)
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// Middleware global para manejar errores
import errorHandler from './middlewares/errorHandler';
// Rutas de productos y ventas
import productRoutes from './routes/productRoutes';
import saleRoutes from './routes/saleRoutes';
// Rutas de autenticación
import authRoutes from './routes/authRoutes';

// Crea la instancia de la aplicación Express
const app = express();

// Middleware
app.use(express.json());   // Parsea el cuerpo de las peticiones como JSON
// Habilita CORS configurado con el origen desde las variables de entorno, o con un default
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
    origin: corsOrigin,
    credentials: true,
}));
app.use(helmet());         // Agrega cabeceras HTTP de seguridad
app.use(morgan('dev'));    // Registra cada petición HTTP en consola (modo desarrollo)

// Routes
app.use('/api/auth', authRoutes);        // Rutas de autenticación
app.use('/api/products', productRoutes); // Rutas para gestión de productos
app.use('/api/sales', saleRoutes);       // Rutas para gestión de ventas

// Ruta raíz: confirma que la API está activa
app.get('/', (_req, res) => {
    res.send('API is running...');
});

// Error Handler: captura cualquier error lanzado en las rutas y lo formatea
app.use(errorHandler);

export default app;
