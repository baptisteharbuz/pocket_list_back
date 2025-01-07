// src/controller/userListAssociation.controller.ts
import { Request, Response } from "express";
import * as userListAssociationService from "../service/userListAssociation.service";

// Récupérer tous les produits d'une liste
export const getProductsByListId = async (req: Request, res: Response) => {
    const { listId } = req.params;
    try {
        const products = await userListAssociationService.getProductsByListId(Number(listId));
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching products for list" });
    }
};

// Ajouter des produits à une liste (avec vérification de présence)
export const addProductsToList = async (req: Request, res: Response): Promise<void> => {
    const { listId } = req.params;
    const { products } = req.body;

    // Vérif basique
    if (!listId || !products || !Array.isArray(products)) {
        res.status(400).json({
            success: false,
            message: "Missing listId or valid 'products' array in request body",
        });
        return;
    }

    try {
        const result = await userListAssociationService.addProductsToList(
            Number(listId),
            products
        );
        // Pas de `return Response`, juste un `res.status(...).json(...)`
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error adding products to list:", error);
        res.status(500).json({
            success: false,
            message: "Error adding products to list",
        });
    }
};

// Mettre à jour les produits d'une liste
export const updateProductsInList = async (req: Request, res: Response) => {
    const { listId } = req.params;
    const { products } = req.body;
    try {
        await userListAssociationService.updateProductsInList(Number(listId), products);
        res.status(200).json({ success: true, message: "Products updated in list" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating products in list" });
    }
};

// Supprimer des produits d'une liste
export const removeProductsFromList = async (req: Request, res: Response) => {
    const { listId } = req.params;
    const { productIds } = req.body;
    try {
        await userListAssociationService.removeProductsFromList(Number(listId), productIds);
        res.status(200).json({ success: true, message: "Products removed from list" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing products from list" });
    }
};