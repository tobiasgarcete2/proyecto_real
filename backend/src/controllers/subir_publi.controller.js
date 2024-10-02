const { newConex } = require('../db/db.js')

const subirPublicacion = async (req, res) => {
    const { title, description, id_user } = req.body;
    const db = await newConex();
    const [result] = await db.query(`INSERT INTO publication (title, description, id_user) VALUES (?,?,?)`, [title, description, id_user]);

    res.status(200).json(result);
};

module.exports = { subirPublicacion };
