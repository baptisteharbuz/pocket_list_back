// src/route/product.route.ts
import { Router, Request, Response } from "express";
import * as productController from "../controller/product.controller";
const router: Router = Router();

router.get("/all", productController.getAllProducts);
router.get("/:id", productController.getProductById); 

router.get("/", (req: Request, res: Response) => {
    res.send("coucou !");
});

export default router;