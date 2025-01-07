// src/route/main.route.ts
import { Router, Request, Response } from "express";
import userRoutes from "./user.route";
import productRoutes from "./product.route";
import listRoutes from "./list.route";
import userListAssociationRoutes from "./userListAssociation.route";

const router: Router = Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/list", listRoutes);
router.use("/association", userListAssociationRoutes);

router.get("/", (req: Request, res: Response) => {
    res.send("Hello !");
});

export default router;