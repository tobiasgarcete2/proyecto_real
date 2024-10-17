const { newConex } = require('/backend/src/db/db.js')

// Crear una nueva publicación
const createPost = async (req,res) => {
    const { title, description } = req.body;
    const db = await newConex();
    const [result] = await db.query(`INSERT INTO publication (title, description) VALUES (?,?)`, [title, description])
    
    return { id: result.insertId, title, description,  id_user}
    };

    module.exports = createPost;