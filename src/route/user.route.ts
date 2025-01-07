import { Router } from 'express';
import * as userController from '../controller/user.controller';

const router: Router = Router();

// Route pour récupérer tous les utilisateurs
router.get('/all', userController.getUsers);

// Route pour récupérer un utilisateur par son ID
router.get('/:id', userController.getUserById);

// Route pour ajouter un nouvel utilisateur
router.post('/add', userController.addUser);

// Route pour la connexion d'un utilisateur
router.post('/login', userController.loginUser);

export default router;
