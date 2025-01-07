// src/service/list.service.ts
import connection from "./databaseService";

// Récupérer toutes les listes privées
export const getAllPrivateLists = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        // FALSE signifie qu'on récupère les listes non privées => à adapter si besoin
        const query = "SELECT * FROM List WHERE Private = FALSE";
        connection.query(query, (err, results) => {
            if (err) {
                console.error("Error fetching private lists:", err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Récupérer toutes les listes d'un utilisateur par son ID
export const getAllListsByUserId = (userId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM List WHERE FK_User = ?";
        connection.query(query, [userId], (err, results) => {
            if (err) {
                console.error("Error fetching lists for user:", err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Récupérer une liste par son ID
export const getListById = (listId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM List WHERE ID_List = ?";
        connection.query(query, [listId], (err, results) => {
            if (err) {
                console.error("Error fetching list by ID:", err);
                return reject(err);
            }
            resolve(results.length > 0 ? results[0] : null);
        });
    });
};

// Créer une nouvelle liste
export const createList = (userId: number, name: string, products: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        // Étape 1 : Créer la liste dans la table `List`
        const query = "INSERT INTO List (FK_User, Name, Creation_Date, Private) VALUES (?, ?, NOW(), FALSE)";
        connection.query(query, [userId, name], (err, result) => {
            if (err) {
                console.error("Error creating list:", err);
                return reject(err);
            }

            const listId = result.insertId;

            // Étape 2 : Ajouter les produits dans `UserListAssociation`
            const productQueries = products.map((product) => {
                return new Promise((resolve, reject) => {
                    const query = "INSERT INTO UserListAssociation (FK_List, FK_Product, Quantity) VALUES (?, ?, ?)";
                    connection.query(query, [listId, product.productId, product.quantity], (err) => {
                        if (err) return reject(err);
                        resolve(true);
                    });
                });
            });

            Promise.all(productQueries)
                .then(() => resolve({ listId }))
                .catch(reject);
        });
    });
};

// Mettre à jour une liste
export const updateList = (listId: number, name: string, isPrivate: boolean): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE List SET Name = ?, Private = ? WHERE ID_List = ?";
        connection.query(query, [name, isPrivate, listId], (err) => {
            if (err) {
                console.error("Error updating list:", err);
                return reject(err);
            }
            resolve(true);
        });
    });
};

// Supprimer une liste
export const deleteList = (listId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM List WHERE ID_List = ?";
        connection.query(query, [listId], (err) => {
            if (err) {
                console.error("Error deleting list:", err);
                return reject(err);
            }
            resolve(true);
        });
    });
};