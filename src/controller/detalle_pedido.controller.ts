import { getRepository } from "typeorm";
import { productoModel } from "../model/producto.model";
import { pedidoModel } from "../model/pedido.model";
import { detalle_pedidoModel } from "../model/detalle_pedido.model";

class detaleController {

    async crearPedido(Request, Response) {
        const { id_cliente, productos } = Request.body;  // Obtener los datos desde el cuerpo de la solicitud

        const pedidoRepository = getRepository(pedidoModel);
        const productoRepository = getRepository(productoModel);
        const detallePedidoRepository = getRepository(detalle_pedidoModel);

        try {
            const nuevoPedido = new pedidoModel();
            nuevoPedido.fecha = new Date().toISOString().split('T')[0];
            nuevoPedido.cantidad_pedida = 0; // Inicializamos el total como 0

            // Guardar el nuevo pedido
            const pedidoGuardado = await pedidoRepository.save(nuevoPedido);

            let totalPedido = 0;

            for (const item of productos) {
                const producto = await productoRepository.findOne({
                    where: { id_producto: item.id_producto } // Buscar por ID del producto
                });

                if (!producto) {
                    return Response.status(404).json({
                        success: false,
                        message: `Producto con ID ${item.id_producto} no encontrado.`
                    });
                }

                if (producto.cantidad < item.cantidad) {
                    return Response.status(400).json({
                        success: false,
                        message: `No hay suficiente stock para el producto ${producto.nombre_producto}.`
                    });
                }

                // Crear el detalle del pedido
                const detallePedido = new detalle_pedidoModel();
                detallePedido.id_pedido = pedidoGuardado;
                detallePedido.id_producto = producto;
                detallePedido.cantidad = item.cantidad;
                detallePedido.subtotal = producto.precio * item.cantidad;

                // Actualizar inventario
                producto.cantidad -= item.cantidad;
                await productoRepository.save(producto);

                // Guardar el detalle del pedido
                await detallePedidoRepository.save(detallePedido);

                // Sumar al total del pedido
                totalPedido += detallePedido.subtotal;
            }

            // Actualizar el total del pedido
            pedidoGuardado.cantidad_pedida = totalPedido;
            await pedidoRepository.save(pedidoGuardado);

            return Response.status(201).json({
                success: true,
                message: 'Pedido creado con éxito.',
                data: pedidoGuardado
            });

        } catch (error) {
            return Response.status(500).json({
                success: false,
                message: error.message || 'Error al crear el pedido.'
            });
        }
    }
}

export default new detaleController();