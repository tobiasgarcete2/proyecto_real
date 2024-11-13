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