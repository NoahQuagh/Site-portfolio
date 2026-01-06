
// FICHIER routes/authRoutes.js


const express = require('express');
const router = express.Router();


const authController = require('../site-api/controllers/authControllers');
// const authMiddleware = require('../middlewares/auth');


//INSCRIPTION

// Route : POST /api/v1/auth/register

router.post('/register', authController.register);


//CONNEXION

// Route : POST /api/v1/auth/login

router.post('/login', authController.login);


//PROFIL UTILISATEUR

// Route : GET /api/v1/auth/me

// router.get('/me', authMiddleware.verifyToken, authController.getMe);

module.exports = router;