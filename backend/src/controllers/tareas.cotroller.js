import { newConex } from "../db/db";

export const ctrl = {};

ctrl.obtenerTareas = async (req, res) => {
    try {
        const connection = await newConex();
        const [results] = await connection.query('SELECT titulo, contenido, imagen_url FROM publicaciones');
        return res.json(results);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        return res.status(500).send('Error al obtener datos de la base de datos');
    }
};
