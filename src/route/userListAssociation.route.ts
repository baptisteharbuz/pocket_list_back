// src/route/userListAssociation.route.ts
import { Router } from "express";
import * as userListAssociationController from "../controller/userListAssociation.controller";

const router: Router = Router();

// Afficher tous les produits d'une liste par ID de liste
router.get("/:listId", userListAssociationController.getProductsByListId);

// Ajouter des produits à une liste
router.post("/:listId", userListAssociationController.addProductsToList);

// Mettre à jour les quantités ou états d'achat des produits dans une liste
router.put("/:listId", userListAssociationController.updateProductsInList);

// Supprimer des produits d'une liste
router.delete("/:listId", userListAssociationController.removeProductsFromList);

export default router;