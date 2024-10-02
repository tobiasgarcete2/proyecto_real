const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const authRoutes = require('./src/routes/auth.routes.js');
const tareasRoutes = require('./src/routes/tareas.routes.js');
const publiRoutes = require('./src/routes/publicaciones.routes.js');
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');

const app = express();

// Middleware para manejar cookies
app.use(cookieParser());


// Middlewares
app.use(cors({
    origin: 'http://localhost:5501',
    credentials: true,
     // Necesario para que las cookies sean transmitidas en las peticiones
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
    res.sendFile(path.join(__dirname, '../Client/inicio.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
