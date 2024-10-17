import { Router } from "express";
import { subirPublicacion, obtenerPublicaciones } from "../controllers/subir_publi.controller.js";
export const router = Router()

// Ruta protegida que requiere validación de JWT
router.post('/',subirPublicacion);
router.get('/',obtenerPublicaciones);