
//IMPORTS

const express = require('express');
const dotenv = require('dotenv'); // variables d'environnement
const cors = require('cors');     //gérer les requêtes
const db = require('./site-api/config/database.js'); // Importe le pool de connexions BDD

// Import des routes
const menuRoutes = require('./routes/menuRoutes');
const authRoutes = require('./routes/authRoutes'); //authentification
const path = require('path');


//CONFIGURATION DE BASE


// Charger les variables d'environnement
dotenv.config();

// Créer l'application Express
const app = express();

// Définir le port
const PORT = process.env.PORT || 3000;


//MIDDLEWARES GLOBAUX


// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});



//DÉFINITION DES ROUTES


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


//GESTION DES ERREURS 404


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `[ \x1b[31mERROR\x1b[0m ] Route non trouvée: ${req.method} ${req.originalUrl}`
    });
});



//DÉMARRAGE DU SERVEUR


// Vérifie si la connexion BDD est OK avant de démarrer le serveur
db.query('SELECT 1').then(() => {
    console.log('[ \x1b[32mOK\x1b[0m ] Connexion MySQL');
    app.listen(PORT, () => {
        console.log(`[ \x1b[36mINFO\x1b[0m ] Serveur démarré sur le port http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('[ \x1b[31mERROR\x1b[0m ] Impossible de démarrer le serveur : Erreur de connexion MySQL');
    process.exit(1); // Arrête le processus en cas d'erreur BDD
});