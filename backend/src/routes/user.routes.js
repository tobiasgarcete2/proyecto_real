import { Router } from "express";
import { obtenerUsuarios} from "../controllers/usuarios.controller.js";
export const userRouter = Router()

// Ruta protegida que requiere validación de JWT
userRouter.get('/:id',obtenerUsuarios);
// router.get('/:id',editarUsuarios);

export default userRouter;