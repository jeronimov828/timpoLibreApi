import { getRepository, getTreeRepository } from "typeorm";
import { usuarioModel } from "../model/usuario_model";
import { responseUtils } from "../utils/response.utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const JWT_SECRET = "secreto_super_seguro"; // Usa variables de entorno en producción

class usuarioController {

    async login(req: Request, res: Response): Promise<void> {
        const { usuario, contrasena } = req.body;

        try {
            const buscaUsuario = await getRepository(usuarioModel).findOneBy({usuario});
            if (!buscaUsuario) {
                await res.json(new responseUtils(false, [], null, "El usuario no existe"));
            }

            const validarContrasena = await bcrypt.compare(contrasena, String(buscaUsuario.contrasena));
            console.log(validarContrasena)
            if (!validarContrasena) {
                await res.json(new responseUtils(false, [], null, "Contraseña incorrecta"));
            return;
            }

            const token = jwt.sign({ id_usuario: buscaUsuario.id_usuario }, JWT_SECRET, { expiresIn: "1h" });
            res.json({token});
        } catch (error) {
            console.error("Error en el login", error);
            await res.json(new responseUtils(false, [], null, "Error en el servidor"));
            return;
        }
    }

    async index(Request, Response) {
        try {
            const usuarios = await getRepository(usuarioModel).find();
            return Response.json(new responseUtils(true, usuarios))
        } catch (error) {
            return Response.json(new responseUtils(false, [], null, error.message))
        }
    }

    async get(Request, Response) {
        try {
            const usuario = await getRepository(usuarioModel).findByIds(Request.params.id);
            return Response.json(new responseUtils(true, [], usuario));
        } catch (ex) {
            return Response.json(new responseUtils(false, [], null, ex.message))
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            // 📌 Extraer datos del body
            const { usuario, contrasena, rol } = req.body;

            // 🔹 Verificar si el usuario ya existe
            const usuarioExistente = await getRepository(usuarioModel).findOneBy({ usuario });
            if (usuarioExistente) {
                await res.status(400).json(new responseUtils(false, [], null, "El usuario ya existe"));
                return
            }

            // 🔹 Hashear la contraseña antes de guardarla
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(contrasena, salt);

            // 🔹 Crear un nuevo usuario con la contraseña encriptada
            const nuevoUsuario = getRepository(usuarioModel).create({
                usuario,
                contrasena: hashedPassword, // Guardamos la contraseña hasheada
                rol,
            });

            // 🔹 Guardar en la base de datos
            const usuarioGuardado = await getRepository(usuarioModel).save(nuevoUsuario);

            await res.json(new responseUtils(true, [], usuarioGuardado, "Usuario creado con éxito"));
            return
        } catch (error) {
            console.error("Error al crear usuario:", error);
            await res.status(500).json(new responseUtils(false, [], null, "Error en el servidor"));
            return
        }
    }
}

export default new usuarioController();