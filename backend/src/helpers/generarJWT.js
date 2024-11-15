import jwt from 'jsonwebtoken'; // Asegúrate de que esta línea esté al inicio del archivo

export const generarJWT = (id, email, username, role, perfil) => {
    return new Promise((resolve, reject) => {
        const payload = { id, email, username, role, perfil }; // Incluyendo username y role

        const secretKey = process.env.JWT_SECRET || 'mydefaultsecret'; // Usar clave segura

        jwt.sign(payload, secretKey, {
            expiresIn: '1h', // Expiración en 1 hora
            algorithm: 'HS256' // Especificar el algoritmo
        }, (err, token) => {
            if (err) {
                return reject(new Error("Error al generar el token: " + err.message)); // Manejo de errores
            }
            resolve(token); // Resolver con el token generado
        });
    });
}
