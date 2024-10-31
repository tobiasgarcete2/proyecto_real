import { newConex } from "../db/db.js";

export const obtenerUsuarios = async (req, res) => {
    try {
        const connection = await newConex();
        const [results] = await connection.query('SELECT id_user,username,role FROM users');
        return res.json(results);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        return res.status(500).send('Error al obtener datos de la base de datos');
    }
};
