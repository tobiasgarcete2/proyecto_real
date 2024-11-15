import express from "express"; // Correcta importación de express
import multer from 'multer';
import path from "path";
import { registerUser, login, session } from "../controllers/auth.controller.js";
import { editarUsuario } from "../controllers/usuarios.controller.js";
import { validarJWT } from "../helpers/validarJWT.js";

const router = express.Router();  // Ahora se usa correctamente

// Rutas y lógica de tus endpoints
/* router.post('/register', (req, res) => {
  // Tu lógica para el registro
}); */

const upload = multer({ dest: 'uploads/' }); // Directorio de almacenamiento para archivos

export const authRoutes = router; // Usamos router directamente

authRoutes.get("/register", upload.single('perfil'), registerUser);

authRoutes.post("/register", registerUser);  // Asegúrate de que la función registerUser esté correctamente importada
authRoutes.post("/login", login);            // Asegúrate de que la función login esté correctamente importada
authRoutes.get("/session", validarJWT, session)
authRoutes.put("/edit",validarJWT, editarUsuario)
