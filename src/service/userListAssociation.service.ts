// src/service/userListAssociation.controller.ts
import connection from "./databaseService";

// Récupérer tous les produits d'une liste
export const getProductsByListId = (listId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT p.ID_Product, p.Label, p.Price, ula.Quantity, ula.Purchased
            FROM UserListAssociation ula
            JOIN Product p ON ula.FK_Product = p.ID_Product
            WHERE ula.FK_List = ?`;
        connection.query(query, [listId], (err, results) => {
            if (err) {
                console.error("Error fetching products for list:", err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

export const addProductsToList = (listId: number, products: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        const productQueries = products.map((product) => {
            return new Promise((resolve, reject) => {
                const checkQuery = `
                  SELECT Quantity
                  FROM UserListAssociation
                  WHERE FK_List = ?
                  AND FK_Product = ?
                `;
                connection.query(checkQuery, [listId, product.productId], (err, results) => {
                    if (err) {
                        return reject(err);
                    }

                    // produit déjà présent ?
                    if (results.length > 0) {
                        const currentQuantity = results[0].Quantity;
                        const newQuantity = currentQuantity + (product.quantity || 1);

                        const updateQuery = `
                          UPDATE UserListAssociation
                          SET Quantity = ?
                          WHERE FK_List = ?
                          AND FK_Product = ?
                        `;
                        connection.query(updateQuery, [newQuantity, listId, product.productId], (err) => {
                            if (err) return reject(err);
                            resolve({
                                productId: product.productId,
                                oldQuantity: currentQuantity,
                                newQuantity,
                                message: "Quantity updated"
                            });
                        });
                    } else {
                        // sinon on insère
                        const insertQuery = `
                          INSERT INTO UserListAssociation (FK_List, FK_Product, Quantity)
                          VALUES (?, ?, ?)
                        `;
                        const insertQuantity = product.quantity || 1;
                        connection.query(insertQuery, [listId, product.productId, insertQuantity], (err) => {
                            if (err) return reject(err);
                            resolve({
                                productId: product.productId,
                                newQuantity: insertQuantity,
                                message: "Product inserted"
                            });
                        });
                    }
                });
            });
        });

        Promise.all(productQueries)
            .then((results) => resolve(results))
            .catch((error) => reject(error));
    });
};

// Mettre à jour les produits d'une liste
export const updateProductsInList = (listId: number, products: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        const productQueries = products.map((product) => {
            return new Promise((resolve, reject) => {
                const query = "UPDATE UserListAssociation SET Quantity = ?, Purchased = ? WHERE FK_List = ? AND FK_Product = ?";
                connection.query(query, [product.quantity, product.purchased, listId, product.productId], (err) => {
                    if (err) return reject(err);
                    resolve(true);
                });
            });
        });
        Promise.all(productQueries)
            .then(() => resolve(true))
            .catch(reject);
    });
};

// Supprimer des produits d'une liste
export const removeProductsFromList = (listId: number, productIds: number[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM UserListAssociation WHERE FK_List = ? AND FK_Product IN (?)";
        connection.query(query, [listId, productIds], (err) => {
            if (err) {
                console.error("Error removing products from list:", err);
                return reject(err);
            }
            resolve(true);
        });
    });
};