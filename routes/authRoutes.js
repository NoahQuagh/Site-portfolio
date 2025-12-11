// ==============================================
// FICHIER routes/authRoutes.js
// ==============================================

const express = require('express');
const router = express.Router();

// 🚨 Assurez-vous que le chemin vers le contrôleur est correct !
// Si votre fichier authController.js est dans 'controllers/authController.js'
const authController = require('../site-api/controllers/authControllers');
// const authMiddleware = require('../middlewares/auth');

// ==============================================
// 1. INSCRIPTION
// Route : POST /api/v1/auth/register
// 🚨 RETIRER la ligne temporaire et utiliser authController.register
router.post('/register', authController.register);

// ==============================================
// 2. CONNEXION
// Route : POST /api/v1/auth/login
// 🚨 RETIRER la ligne temporaire et utiliser authController.login
router.post('/login', authController.login);

// ==============================================
// 3. PROFIL UTILISATEUR (Accès protégé)
// Route : GET /api/v1/auth/me
// router.get('/me', authMiddleware.verifyToken, authController.getMe);

module.exports = router;