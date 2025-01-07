// src/controller/list.controller.ts
import { Request, Response } from "express";
import * as listService from "../service/list.service";

// Récupérer toutes les listes privées
export const getAllPrivateLists = async (req: Request, res: Response) => {
    try {
        const lists = await listService.getAllPrivateLists();
        res.status(200).json({ success: true, data: lists });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching private lists" });
    }
};

// Récupérer toutes les listes d'un utilisateur
export const getAllListsByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const lists = await listService.getAllListsByUserId(Number(userId));
        res.status(200).json({ success: true, data: lists });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching user lists" });
    }
};

// Récupérer une liste par son ID
export const getListById = async (req: Request, res: Response) => {
    const { listId } = req.params;
    try {
        const list = await listService.getListById(Number(listId));
        res.status(200).json({ success: true, data: list });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching list by ID" });
    }
};

// Créer une nouvelle liste
export const createList = async (req: Request, res: Response): Promise<void> => {
    const { userId, name, products } = req.body;

    if (!userId || !name || !products || !Array.isArray(products)) {
        res.status(400).json({
            success: false,
            message: "Invalid request body. `userId`, `name`, and `products` are required.",
        });
        return;
    }

    try {
        const result = await listService.createList(userId, name, products);
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error("Error creating list:", error);
        res.status(500).json({ success: false, message: "Error creating list" });
    }
};

// Mettre à jour une liste
export const updateList = async (req: Request, res: Response) => {
    const { listId } = req.params;
    const { name, isPrivate } = req.body;
    try {
        await listService.updateList(Number(listId), name, isPrivate);
        res.status(200).json({ success: true, message: "List updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating list" });
    }
};

// Supprimer une liste
export const deleteList = async (req: Request, res: Response) => {
    const { listId } = req.params;
    try {
        await listService.deleteList(Number(listId));
        res.status(200).json({ success: true, message: "List deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting list" });
    }
};