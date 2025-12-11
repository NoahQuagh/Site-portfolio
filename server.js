// ==============================================
// 1. IMPORTS
// ==============================================
const express = require('express');
const dotenv = require('dotenv'); // Pour lire les variables d'environnement (.env)
const cors = require('cors');     // Pour gérer les requêtes cross-origin (si votre front est sur un port différent)
const db = require('./site-api/config/database.js'); // Importe le pool de connexions BDD (pour s'assurer qu'il est chargé)

// Import des routes
const menuRoutes = require('./routes/menuRoutes');
const authRoutes = require('./routes/authRoutes'); // Nous en aurons besoin pour l'authentification
const path = require('path');

// ==============================================
// 2. CONFIGURATION DE BASE
// ==============================================

// Charger les variables d'environnement du fichier .env
dotenv.config();

// Créer l'application Express
const app = express();

// Définir le port
const PORT = process.env.PORT || 3000;

// ==============================================
// 3. MIDDLEWARES GLOBAUX
// ==============================================

// Middleware pour parser le corps des requêtes en JSON (pour les POST/PUT)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// Middleware CORS pour autoriser les requêtes depuis n'importe quel domaine (à ajuster en production)
app.use(cors());

// Middleware simple de log pour toute requête
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});


// ==============================================
// 4. DÉFINITION DES ROUTES
// ==============================================

// Route de base de l'API
app.get('/', (req, res) => {
    const frontendUrl = './index.html';
    res.redirect(frontendUrl);
});

app.get('/', (req, res) => {
    // Ceci va automatiquement chercher et envoyer le fichier /public/index.html
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Montage des routes sous le préfixe /api/v1
app.use('/api/v1/menus', menuRoutes);
app.use('/api/v1/auth', authRoutes); // Pour les routes /login, /register, etc.

// ==============================================
// 5. GESTION DES ERREURS 404
// ==============================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route non trouvée: ${req.method} ${req.originalUrl}`
    });
});


// ==============================================
// 6. DÉMARRAGE DU SERVEUR
// ==============================================

// Vérifie si la connexion BDD est OK avant de démarrer le serveur (bonne pratique)
db.query('SELECT 1').then(() => {
    console.log('🔗 Connexion MySQL OK');
    app.listen(PORT, () => {
        console.log(`🚀 Serveur démarré sur le port http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('❌ Impossible de démarrer le serveur : Erreur de connexion MySQL');
    console.error(err);
    process.exit(1); // Arrête le processus en cas d'erreur BDD
});