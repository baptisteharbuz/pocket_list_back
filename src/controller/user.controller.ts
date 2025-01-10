import { Request, Response } from 'express';
import userService from '../service/user.service'; // Importer le service utilisateur

// Fonction pour récupérer tous les utilisateurs
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.fetchAllUsers(); // Appel au service pour récupérer tous les utilisateurs
    res.status(200).json({success: true, data: users}); // Réponse avec les utilisateurs récupérés
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Fonction pour récupérer un utilisateur par son ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await userService.fetchUserById(userId); // Appel au service pour récupérer un utilisateur
    if (!user || user.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user); // Réponse avec l'utilisateur récupéré
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user by ID', error });
  }
};

// Fonction pour ajouter un utilisateur
export const addUser = async (req: Request, res: Response): Promise<void> => {
  const { FirstName, LastName, Email, Password, Age } = req.body;

  const newUser = { FirstName, LastName, Email, Password, Age };

  try {
    const result = await userService.addUser(newUser); // Appel au service pour ajouter un utilisateur
    res.status(201).json(result); // Réponse avec le résultat de l'ajout
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
};

// Fonction pour gérer la connexion de l'utilisateur
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { Email, Password } = req.body;

  try {
    const user = await userService.fetchConnexion({ Email, Password }); // Appel au service pour vérifier les identifiants
    if (user.length === 0) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    res.status(200).json(user[0]); // Réponse avec l'utilisateur connecté
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error });
  }
};
