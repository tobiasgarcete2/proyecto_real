import { newConex } from "../db/db.js";


// CREAR

export const crearUsuario = async (req, res) => {
    const { username, password_has,email, role, descripcion } = req.body;

    try {
        const connection = await newConex();
        await connection.query('INSERT INTO users (username, password_has,email,  role) VALUES (?,?,?,?)', [username, password_has,email, role, descripcion]);
        res.json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error interno del servidor");
    } finally {
        await connection.end(); // Cerrar la conexión
    }
};
// OBTENER UNO

export const obtenerUsuarios = async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await newConex();
        const [results] = await connection.query('SELECT id_user, username, role FROM users WHERE id_user =?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.json(results[0]);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return res.status(500).send('Error al obtener datos de la base de datos');
    }
};
// OBTENER TODOS

export const obtenerTodosUsuarios = async (req, res) => {
    try {
        const connection = await newConex();
        const [results] = await connection.query('SELECT id_user, username, role FROM users');
        return res.json(results);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        return res.status(500).send('Error al obtener datos de la base de datos');
    }
};
// EDITAR

export const editarUsuario = async (req, res) => {
    const { username, password,email, descripcion } = req.body;
    
    try {
        const connection = await newConex();
        const hola = await connection.query('UPDATE users SET username = "?" , email="?", descripcion="?"  WHERE id_user =?', [username, email, descripcion, req.user.id_user]);
        console.log(hola);
        res.json({ message: "Usuario editado correctamente" });
    } catch (error) {
        console.error("Error al editar usuario:", error);
        res.status(500).send("Error interno del servidor");
    } 
};
