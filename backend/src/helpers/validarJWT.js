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
        const { id } = jwt.verify(token, 'mydefaultsecret');
        console.log("ID decodificado del token:", id);
    
        const connection = await newConex();
    
        const [usuario] = await connection.query('SELECT * FROM users WHERE id_user = ? LIMIT 1', [id]);
        console.log("Usuario encontrado en la BD:", usuario);
    
        if (!usuario || usuario.length === 0) {
            console.log("Usuario no encontrado en la base de datos.");
            await connection.end();
            return res.status(401).json({ msg: 'Token no válido - usuario no existe en la BD' });
        }
    
        req.user = usuario[0];
        console.log("Usuario asignado a req.user:", req.user);
    
        await connection.end();
        next();
    
    } catch (error) {
        console.log("Error de validación del token o en la conexión:", error);
        return res.status(401).json({ msg: 'Token no válido' });
    }
    
}
