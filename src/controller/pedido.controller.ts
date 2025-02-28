import { responseUtils } from "../utils/response.utils";
import { pedidoModel } from "../model/pedido.model";
import { getRepository } from 'typeorm';
import { Request, response, Response } from "express";

class pedidoController {

  async create(Request, response) {
    try {
      const dataPedido = {
        ...Request.body,
        fecha: new Date().toISOString().split('T')[0] // Fecha actual
      }

      const pedido = await getRepository(pedidoModel).create(dataPedido);

      const resultado = await getRepository(pedidoModel).save(pedido);

      return response.json(new responseUtils(true, [], resultado, "pedido correctamente guardado"));

    } catch (ex) {
      // En caso de error, devolver la respuesta con el error
      return response.json(new responseUtils(false, [], null, ex.message));
    }
  }


};

export default new pedidoController();