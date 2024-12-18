import { newConex } from "../db/db.js";
import { generarJWT } from "../helpers/generarJWT.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    const { username, email, password, role, docPers } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!username || !email || !password || !role || !docPers) {
        return res.status(400).send("Por favor, complete todos los campos del formulario");
    }

    const conex = await newConex(); // Crear la conexión

    try {
        // Iniciar la transacción
        await conex.beginTransaction();

        // Verificar si el email ya existe
        const [existingUsers] = await conex.query("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUsers.length > 0) {
            await conex.rollback();
            return res.status(400).send("El email ya está registrado");
        }

        // Hashear la contraseña
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Insertar los datos en la tabla 'users'
        const [userResult] = await conex.query(
            "INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)",
            [username, email, password_hash, role]
        );

        const userId = userResult.insertId; // Obtener el ID del usuario recién insertado

        // Insertar en la tabla auxiliar correspondiente según el rol
        if (role === 'empresa') {
            await conex.query("INSERT INTO user_company (id_user, cuit) VALUES (?, ?)", [userId, docPers]);
        } else if (role === 'desempleado') {
            await conex.query("INSERT INTO user_peoples (id_user, cuil) VALUES (?, ?)", [userId, docPers]);
        } else {
            await conex.rollback();
            return res.status(400).send("El rol especificado no es válido");
        }

        // Confirmar la transacción
        await conex.commit();

        // Enviar una respuesta indicando que el usuario fue registrado
        res.json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        await conex.rollback(); // Revertir los cambios en caso de error
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error interno del servidor");
    } finally {
        await conex.end(); // Cerrar la conexión
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Por favor, complete todos los campos del formulario" });
    }

    const conex = await newConex();

    try {
        const [result] = await conex.query("SELECT id_user, username, email, password_hash, role FROM users WHERE email = ?", [email]);

        if (result.length === 0) {
            await conex.end();
            return res.status(401).json({ message: "Usuario no registrado. Por favor, regístrese." });
        }

        const usuario = result[0];

        const passwordMatch = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordMatch) {
            await conex.end();
            return res.status(401).json({ message: "El correo electrónico o la contraseña no coinciden" });
        }

        const token = await generarJWT(usuario.id_user, usuario.email, usuario.username, usuario.role);

        await conex.end();

        res.cookie("token", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
            sameSite: 'Lax'
        });

        // Incluir el rol en la respuesta
        res.json({
            message: 'Inicio de sesión exitoso',
            username: usuario.username,
            role: usuario.role, // Aquí se incluye el rol
            token: token
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};



const session = async (req, res) => {
    if (!req.user) {
        return res.status(400).json({ message: "No se encontró nada" });
    } else {
        res.json({ message: "Sesión iniciada correctamente", user: req.user });
    }
};

export { registerUser, login, session };
