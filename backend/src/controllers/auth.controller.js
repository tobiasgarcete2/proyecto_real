import { newConex } from "../db/db.js";
import generarJWT from "../helpers/generarJWT.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!username || !email || !password || !role) {
        return res.status(400).send("Por favor, complete todos los campos del formulario");
    }

    try {
        // Crear una nueva conexión a la base de datos
        const conex = await newConex();

        // Verificar si el email ya existe
        const [existingUsers] = await conex.query("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUsers.length > 0) {
            await conex.end();
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
            await conex.query("INSERT INTO user_company (id_user) VALUES (?)", [userId]);
        } else if (role === 'desempleado') {
            await conex.query("INSERT INTO user_peoples (id_user) VALUES (?)", [userId]);
        } else {
            await conex.end();
            return res.status(400).send("El rol especificado no es válido");
        }

        // Cerrar la conexión a la base de datos
        await conex.end();

        // Generar el token JWT
        const token = await generarJWT();

        // Configurar la cookie con el token JWT
        res.cookie("token", token, {
            httpOnly: true, // Solo accesible desde el servidor
            secure: process.env.NODE_ENV === "production", // Solo usar en HTTPS en producción
            maxAge: 3600000 // 1 hora de duración
        });

        // Enviar una respuesta indicando que el usuario fue registrado
        res.json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!email || !password) {
        return res.status(400).json({ message: "Por favor, complete todos los campos del formulario" });
    }

    try {
        // Crear una nueva conexión a la base de datos
        const conex = await newConex();

        // Consulta para verificar las credenciales del usuario
        const [result] = await conex.query(
            "SELECT email, password_hash FROM users WHERE email = ?", 
            [email]
        );

        // Si no se encuentra el usuario, devolver un mensaje indicando que debe registrarse
        if (result.length === 0) {
            await conex.end();
            return res.status(401).json({ message: "Usuario no registrado. Por favor, regístrese." });
        }

        const usuario = result[0];

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordMatch) {
            await conex.end();
            return res.status(401).json({ message: "El correo electrónico o la contraseña no coinciden" });
        }

        // Generar el token JWT con el ID y email del usuario
        const token = await generarJWT({ id: usuario.id, email: usuario.email });

        // Cerrar la conexión a la base de datos
        await conex.end();

        // Configurar la cookie con el token JWT
        res.cookie("token", token, {
            httpOnly: true, // Solo accesible desde el servidor
            secure: process.env.NODE_ENV === "production", // Solo usar en HTTPS en producción
            maxAge: 3600000 // 1 hora de duración
        });

        // Retornar un mensaje de éxito
        res.json({
            message: 'Inicio de sesión exitoso',
            username: usuario.username,
            token: token
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export { registerUser, login };
