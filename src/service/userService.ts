import connection from './databaseService';
import bcrypt from 'bcrypt';

// Fonction pour récupérer tous les utilisateurs
const fetchAllUsers = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM user;`;
    connection.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Fonction pour récupérer un utilisateur par son ID
const fetchUserById = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT ID_User, FirstName, LastName FROM user WHERE ID_User = ?`;
    connection.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


export const addUser = async (user: any): Promise<any> => {
  console.log('Request received with user:', user); // Vérification du début de la requête
  return new Promise(async (resolve, reject) => {
    try {
      if (!user.Password) {
        return reject(new Error("Le mot de passe est requis"));
      }

      console.log('Mot de passe avant hachage:', user.Password);

      const hashedPassword = await bcrypt.hash(user.Password, 10);
      console.log('Mot de passe haché:', hashedPassword);

      const sql = `INSERT INTO user (FirstName, LastName, Email, Password, Age) VALUES (?, ?, ?, ?, ?)`;

      connection.query(
        sql,
        [user.FirstName, user.LastName, user.Email, hashedPassword, user.Age],
        (err, result) => {
          if (err) {
            console.error('Erreur lors de l\'insertion de l\'utilisateur:', err);
            return reject(err);
          }
          resolve(result);
        }
      );
    } catch (error) {
      console.error('Erreur lors du hachage du mot de passe:', error);
      reject(error);
    }
  });
};

// Fonction pour vérifier la connexion de l'utilisateur
const fetchConnexion = (user: { Email: string; Password: string }): Promise<any> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM user WHERE Email = ?`;  // On ne récupère plus le mot de passe directement ici.
    connection.query(sql, [user.Email], async (err, result) => {
      if (err) return reject(err);

      // Vérifier si l'utilisateur existe
      if (result.length === 0) {
        return reject(new Error('Utilisateur non trouvé.'));
      }

      // Récupérer le mot de passe haché stocké en base de données
      const storedPassword = result[0].Password;

      try {
        // Comparer le mot de passe fourni avec le mot de passe haché
        const match = await bcrypt.compare(user.Password, storedPassword);
        
        if (match) {
          // Le mot de passe est correct, retourner l'utilisateur
          resolve(result[0]);
        } else {
          // Le mot de passe est incorrect
          reject(new Error('Mot de passe incorrect.'));
        }
      } catch (error) {
        reject(error);  // Gérer les erreurs de bcrypt
      }
    });
  });
};

export default {
  fetchAllUsers,
  fetchUserById,
  addUser,
  fetchConnexion
};
