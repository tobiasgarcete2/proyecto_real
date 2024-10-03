const jwt = require('jsonwebtoken');

const generarJWT = (id) => {

    return new Promise((resolve, reject) => {
        // Asegurarse de que el id se pasa dentro de un objeto como payload
        const payload = { id };

        // Fimar el token con el payload
        jwt.sign(payload, 'mysecret', {
            expiresIn: 60 * 60 // Expiración en 1 hora
        }, (err, token) => {
            if (err) {
                reject(err); // Si hay error, rechazar la promesa
            } else {
                resolve(token); // Si no hay error, resolver con el token
            }
        });
    });
}

module.exports = generarJWT;
