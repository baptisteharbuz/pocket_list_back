import { Router } from "express";
import * as userController from "../controller/userController";
const router: Router = Router();

router.post("/add", userController.addUser)

export default router;