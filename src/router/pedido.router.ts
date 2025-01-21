import { Router } from "express";
import pedidoController from "../controller/pedido.controller";

let routerPedido = Router();

routerPedido.post("/pedidos", pedidoController.create);

export default routerPedido;