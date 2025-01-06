import { Router, Request, Response } from "express";
import userRoutes from "./user.route"

const router: Router = Router();

router.use("/user", userRoutes);

router.get("/", (req: Request, res: Response) => {
    res.send("Hello !");
});
// carrefour des routes 

export default router;