const jwt = require('jsonwebtoken');
const { newConex } = require('../db/db');

const validarJWT = async (req, res, next) => {
    const token = req.cookies.token

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
            return res.status(401).json({ msg: 'Token no válido - usuario no existe en la BD' });
        }

        // Agregamos el usuario a la request
        req.user = usuario[0];
        next(); // Pasar al siguiente middleware o controlador

    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'Token no válido' });
    }
};

module.exports = validarJWT;
