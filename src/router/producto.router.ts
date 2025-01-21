import { Router } from "express";
import ProductController from "./../controller/producto.controller"

let router = Router();

router.get("/productos", ProductController.index);
router.get("/productos/:id", ProductController.get);
router.post("/productos", ProductController.create);
router.put("/productos/:id", ProductController.update);
router.delete("/productos/:id", ProductController.delete);

export default router;