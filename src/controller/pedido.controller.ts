import { productoModel } from "../model/producto.model";
import { responseUtils } from "../utils/response.utils";
import { pedidoModel } from "../model/pedido.model";
import { getRepository } from 'typeorm';
import { Request, response, Response } from "express";

class pedidoController {

    async create(Request, response) {
        const { id_producto, cantidad_pedida } = Request.body;

        const productoRepository = getRepository(productoModel);
        const pedidoRepository = getRepository(pedidoModel);

        try {
            // Busca el producto en la base de datos
            const producto = await productoRepository.findOneBy(Request.params.id_producto);
      
            if (!producto) {
              return response.status(404).json(new responseUtils(false, [], null, 'Producto no encontrado.'));
            }
      
            // Verifica que haya suficiente cantidad disponible
            if (producto.cantidad < cantidad_pedida) {
              return response.status(400).json(new responseUtils(false, [], null, 'No hay suficiente stock disponible.'));
            }
      
            // Crea el pedido
            const nuevoPedido = pedidoRepository.create({
              producto,
              cantidad_pedida,
              total: producto.precio * cantidad_pedida,
              fecha: new Date().toISOString().split('T')[0] // Fecha actual
            });
      
            await pedidoRepository.save(nuevoPedido);
      
            // Resta la cantidad del producto en el inventario
            producto.cantidad -= cantidad_pedida;
            await productoRepository.save(producto);
      
            return response.status(201).json(new responseUtils(true, [nuevoPedido], null, 'Pedido creado con éxito.'));
          } catch (error) {
            return response.status(500).json(new responseUtils(false, [], null, error.message));
          }
        }
      };

export default new pedidoController();