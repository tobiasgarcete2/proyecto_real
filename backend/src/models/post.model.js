const { newConex } = require('/backend/src/db/db.js')

// Crear una nueva publicación
const createPost = async (req,res) => {
    const { title, description } = req.body;
    const { id_user } = req.user.id; // Obtener el id del usuario del token JWT
    const db = await newConex();
    const [result] = await db.query(`INSERT INTO publication (title, description, id_user) VALUES (?,?,?)`, [title, description, id_user])
    
    return { id: result.insertId, title, description,  id_user}
    };

    module.exports = createPost;