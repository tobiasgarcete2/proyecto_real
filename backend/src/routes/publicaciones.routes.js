const express = require("express");
const validarJWT = require('../helpers/validarJWT');
const { subirPublicacion } = require('../controllers/subir_publi.controller');

const router = express.Router();

// Ruta protegida que requiere validación de JWT
router.post('/', validarJWT, subirPublicacion);

module.exports = router;
