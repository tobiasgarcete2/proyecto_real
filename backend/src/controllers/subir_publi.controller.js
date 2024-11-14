import { newConex } from '../db/db.js'
import jwt from 'jsonwebtoken';

export const subirPublicacion = async (req, res) => {
    const { title, description, role, userId} = req.body;
    const db = await newConex();
    if (role === 'empresa'){
        const [result] = await db.query(`INSERT INTO publication (title, description,role,userId) VALUES (?,?,?,?)`, [title, description, role,userId]);
    
        res.status(200).json(result);
    }else{
        res.status(403).json({ message: "Solo las empresas pueden subir publicaciones." });
    }
};

export const obtenerPublicaciones = async (req,res) =>{
    const db = await newConex();
    const [publicaciones] = await db.query('SELECT * FROM publication');
    res.status(200).json(publicaciones);
}

export const eliminarPublicaciones = async (req,res) => {
    console.log(req.cookies);
    const {token} = req.cookies;
    const decoded = jwt.verify(token,"mydefaultsecret");
    const { id } = req.params;
    const db = await newConex();
    await db.query('DELETE FROM publication WHERE id= ? AND userId = ? ', [id,decoded.id]);
    res.status(204).send();
}

export const obtenerPublicacionId = async (req, res) => {
    console.log('hola aaaa')
    const postId = req.params.id;  // Extrae el ID de los parámetros de la URL
    console.log(postId);
    const db = await newConex();

    try {
        const [publication] = await db.query('SELECT * FROM publication WHERE id = ?', [postId]);
        if (publication) {
            res.status(200).json(publication);  // Devuelve la publicación en formato JSON
        } else {
            res.status(404).json({ message: 'Publicación no encontrada' });  // Si no se encuentra la publicación
        }
    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
        res.status(500).json({ message: 'Error al obtener la publicación' });
    }
};

