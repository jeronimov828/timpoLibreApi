import { Router } from "express";
import detalle_pedidoController from "../controller/detalle_pedido.controller";

let routerDetalle = Router();

routerDetalle.post("/detalle", detalle_pedidoController.crearPedido);

export default routerDetalle;