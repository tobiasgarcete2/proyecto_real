import { newConex } from "../db/db.js";
import { uploadImage } from "../utils/utils.js";

// CREAR

export const crearUsuario = async (req, res) => {
    const { username, password_has, email, role, descripcion, perfil } = req.body;

    try {
        let perfilUrl = null;

        // Verificar si hay una imagen de perfil
        if (req.files && req.files.perfil) {
            // Subir imagen a Cloudinary
            perfilUrl = await uploadImage(req.files.perfil);
        }

        const connection = await newConex();

        // Insertar en la base de datos
        await connection.query('INSERT INTO users (username, password_has, email, role, descripcion, perfil) VALUES (?,?,?,?,?,?)', [
            username, password_has, email, role, descripcion, perfilUrl
        ]);

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
        const [results] = await connection.query('SELECT * FROM users WHERE id_user =?', [id]);
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
    console.log("Usuario recibido desde validarJWT:", req.user);

    const { username, email, descripcion } = req.body;
    const id_user = req.user?.id_user;

    if (!id_user) {
        return res.status(400).json({ message: "ID de usuario no proporcionado" });
    }

    try {
        const connection = await newConex();

        const [user] = await connection.query('SELECT * FROM users WHERE id_user = ?', [id_user]);
        if (!user.length) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const usernameFinal = username || user[0].username;
        const emailFinal = email || user[0].email;
        const descripcionFinal = descripcion || user[0].descripcion;

        const [result] = await connection.query(
            'UPDATE users SET username = ?, email = ?, descripcion = ? WHERE id_user = ?',
            [usernameFinal, emailFinal, descripcionFinal, id_user]
        );

        if (result.affectedRows === 0 || result.changedRows === 0) {
            return res.status(200).json({ message: "No se realizaron cambios" });
        }

        console.log(result.message);
        console.log(result.warningCount)

        console.log("Usuario actualizado:", result);
        res.json({ message: "Usuario editado correctamente" });
    } catch (error) {
        console.error("Error al editar usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
};

