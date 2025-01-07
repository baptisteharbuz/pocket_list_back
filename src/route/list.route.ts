// src/route/list.route.ts
import { Router } from "express";
import * as listController from "../controller/list.controller";

const router: Router = Router();

// Afficher toutes les listes privées
router.get("/all", listController.getAllPrivateLists);

// Afficher toutes les listes d'un utilisateur
router.get("/user/:userId", listController.getAllListsByUserId);

// Afficher une liste par son ID
router.get("/:listId", listController.getListById);

// Créer une nouvelle liste
router.post("/", listController.createList);

// Mettre à jour une liste
router.put("/:listId", listController.updateList);

// Supprimer une liste
router.delete("/:listId", listController.deleteList);

export default router;