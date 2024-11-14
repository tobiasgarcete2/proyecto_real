import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import {authRoutes} from './src/routes/auth.routes.js';
import { router } from './src/routes/publicaciones.routes.js';
import userRouter from "./src/routes/user.routes.js"
const PORT = process.env.PORT || 4000;
import cookieParser from 'cookie-parser';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const app = express();

// Usar __dirname para definir la ruta estática
app.use(express.static(path.join(__dirname, '../Client')));

// Resto de tu configuración de Express


// Middleware para manejar cookies
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))


// Middlewares
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Especificar ambos orígenes
    credentials: true, // Si necesitas enviar cookies u otras credenciales
    methods: ['GET','POST','PUT','DELETE'],
    validateOrigins: true,
    allowedHeaders: ['Content-Type', 'Authorization',],
    preflightContinue: true,
    optionsSuccessStatus: 204
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'Client'
app.use(express.static(path.join(__dirname, '../Client')));

// Rutas
app.use('/auth', authRoutes);
app.use('/post', router);
app.use('/users', userRouter);

// Ruta para manejar todas las demás solicitudes y servir el archivo HTML principal
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/inicio.html'
//     ));
// });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
