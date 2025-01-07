// src/controller/product.controller.ts
import { Request, Response } from "express";
import * as productService from "../service/product.service";

// Récupérer tous les produits
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error("Error in product controller:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching products",
        });
    }
};

// Récupérer un produit par son ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        res.status(400).json({
            success: false,
            message: "Invalid product ID",
        });
        return;
    }

    try {
        const product = await productService.getProductById(Number(id));
        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error("Error in product controller:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching product",
        });
    }
};