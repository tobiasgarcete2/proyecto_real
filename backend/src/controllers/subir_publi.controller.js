import { newConex } from '../db/db.js'

export const subirPublicacion = async (req, res) => {
    const { title, description } = req.body;
    const db = await newConex();
    const [result] = await db.query(`INSERT INTO publication (title, description) VALUES (?,?)`, [title, description]);

    res.status(200).json(result);
};

export const obtenerPublicaciones = async (req,res) =>{
    const db = await newConex();
    const [publicaciones] = await db.query('SELECT * FROM publication');
    res.status(200).json(publicaciones);
}