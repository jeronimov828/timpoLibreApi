import { Request, response, Response } from "express";
import { Connection, getConnection, getRepository, Repository, Tree } from "typeorm";
import { productoModel } from "../model/producto.model";
import { responseUtils } from "../utils/response.utils";

class ProductController {

    async index(Request, Response) {
        try {
            const productos = await getRepository(productoModel).find();
            return Response.json(new responseUtils(true, productos));
        } catch (ex) {
            return Response.json(new responseUtils(false, [], null, ex.message))
        }
    }

    async get(Request, Response) {
        try {
            const producto = await getRepository(productoModel).findByIds(Request.params.id);
            return Response.json(new responseUtils(true, [], producto));
        } catch (ex) {
            return Response.json(new responseUtils(false, [], null, ex.message))
        }
    }

    async create(Request, Response) {
        try {
            // Asignar la fecha del día de hoy a 'fecha_ingreso'
            const productoData = {
                ...Request.body,         // Copiar todos los valores del cuerpo de la solicitud
            };

            // Crear el producto con los datos modificados
            const producto = await getRepository(productoModel).create(productoData);

            // Guardar el producto en la base de datos
            const resultado = await getRepository(productoModel).save(producto);

            // Devolver la respuesta con el resultado
            return Response.json(new responseUtils(true, [], resultado, "Producto correctamente guardado"));
        } catch (ex) {
            // En caso de error, devolver la respuesta con el error
            return Response.json(new responseUtils(false, [], null, ex.message));
        }
    }

    async update(Request, Response) {
        try {
            const producto = await getRepository(productoModel).findOneBy(Request.params.id_producto);
            await getRepository(productoModel).merge(producto, Request.body)
            const resultado = await getRepository(productoModel).save(producto);
            return Response.json(new responseUtils(true, [], resultado, "correctamente modificado"));
        } catch (ex) {
            return Response.json(new responseUtils(false, [], null, ex.message))
        }
    }

    async delete(Request, Response) {
        try {
            const producto = await await getRepository(productoModel).delete(Request.params);
            return Response.json(new responseUtils(true, [], producto, "correctamente eliminado"));
        } catch (ex) {
            return Response.json(new responseUtils(false, [], null, ex.message))
        }
    }
}

export default new ProductController();