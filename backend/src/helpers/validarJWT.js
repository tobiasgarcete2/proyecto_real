import jwt from 'jsonwebtoken';
import { newConex } from '../db/db.js';
export const validarJWT = async (req, res, next) => {
    console.log("Hola, verificación del JWT");

    // Verifica las cookies recibidas
    console.log("Cookies recibidas:", req.cookies);

    // Intenta obtener el token de las cookies
    const token = req.cookies.token;
    console.log("Token extraído:", token);

    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }

    try {
        // Verificamos si el token es válido
        const { id } = jwt.verify(token, 'mysecret');

        const connection = await newConex();

        // Buscar el usuario en la base de datos
        const [usuario] = await connection.query('SELECT * FROM users WHERE id_user = ? LIMIT 1', [id]);

        if (!usuario || usuario.length === 0) {
            await connection.end(); // Cerrar la conexión si no existe el usuario
            return res.status(401).json({ msg: 'Token no válido - usuario no existe en la BD' });
        }
        
        // Agregamos el usuario a la request
        req.user = usuario[0];

        await connection.end(); // Cerrar la conexión si todo es correcto

        next(); // Pasar al siguiente middleware o controlador

    } catch (error) {
        console.log("Error de validación:", error);
        return res.status(401).json({ msg: 'Token no válido' });
    }
}
