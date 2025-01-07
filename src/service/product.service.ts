// src/service/product.service.ts
import connection from "./databaseService";

// Fonction pour récupérer tous les produits
export const getAllProducts = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Product";
        connection.query(query, (err, results) => {
            if (err) {
                console.error("Error fetching products in service:", err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Fonction pour récupérer un produit par son ID
export const getProductById = (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Product WHERE ID_Product = ?";
        connection.query(query, [id], (err, results) => {
            if (err) {
                console.error("Error fetching product by ID in service:", err);
                return reject(err);
            }
            resolve(results.length > 0 ? results[0] : null);
        });
    });
};