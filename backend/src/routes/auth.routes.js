import Router from "express";
import path from "path";
import { registerUser, login, session } from "../controllers/auth.controller.js";
import { validarJWT } from "../helpers/validarJWT.js";

export const authRoutes = Router();

authRoutes.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '../../../Client/registrarse.html'));
});

authRoutes.post("/register", registerUser);  // Asegúrate de que la función registerUser esté correctamente importada
authRoutes.post("/login", login);            // Asegúrate de que la función login esté correctamente importada
authRoutes.get("/session", validarJWT, session)

