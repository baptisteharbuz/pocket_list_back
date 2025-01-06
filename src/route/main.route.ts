import { Router, Request, Response } from "express";
import userRoutes from "./user.route"

const router: Router = Router();

router.use("/user", userRoutes);

router.get("/", (req: Request, res: Response) => {
    res.send("Hello ! Working on bdd_asso_prospection");
});

export default router;