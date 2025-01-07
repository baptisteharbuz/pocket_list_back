import connection from "./databaseService";
import bcrypt from 'bcrypt'

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

            const sql = 'INSERT INTO user (FirstName, LastName, Email, Password, Age) VALUES(?, ?, ?, ?, ?)';

            connection.query(
                sql,
                [user.FirstName, user.LastName, user.Email, hashedPassword, user.Age],
                (err, result) => {
                    if (err) {
                        console.error('Erreur lors de linsertion de lutilisateur:', err);
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

export default {
    addUser
}