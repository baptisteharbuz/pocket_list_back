import { Request, Response } from "express";
import userService from '../service/userService'

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
