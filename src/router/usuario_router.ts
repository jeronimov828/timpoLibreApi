import { Router } from "express";
import usuario_controller from "../controller/usuario_controller";
import { check } from "express-validator";

let routerUsuario = Router();

routerUsuario.get("/usuarios", usuario_controller.index);
routerUsuario.get("/usuarios/:id", usuario_controller.get);
routerUsuario.post("/usuarios", usuario_controller.create);
routerUsuario.post("/login", [
    check("email", "El usuario es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
], usuario_controller.login);

export default routerUsuario;