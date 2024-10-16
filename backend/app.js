import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import authRoutes from './src/routes/auth.routes.js';
import tareasRoutes from './src/routes/tareas.routes.js';
import publiRoutes from './src/routes/publicaciones.routes.js';
const PORT = process.env.PORT || 4000;
import cookieParser from 'cookie-parser';

export const app = express();

// Middleware para manejar cookies
app.use(cookieParser());


// Middlewares
app.use(cors({
    origin: ['http://localhost:5501', 'http://127.0.0.1:5501'], // Especificar ambos orígenes
    credentials: true // Si necesitas enviar cookies u otras credenciales
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'Client'
app.use(express.static(path.join(__dirname, '../Client')));

// Rutas
app.use('/auth', authRoutes);
app.use('/publicacion', tareasRoutes);
app.use('/post', publiRoutes);

// Ruta para manejar todas las demás solicitudes y servir el archivo HTML principal
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/inicio.html'
    ));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
