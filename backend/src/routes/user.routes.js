import { Router } from "express";
import { obtenerUsuarios} from "../controllers/usuarios.controller.js";
export const router = Router()

// Ruta protegida que requiere validación de JWT
router.get('/',obtenerUsuarios);
// router.get('/:id',editarUsuarios);

export default router;