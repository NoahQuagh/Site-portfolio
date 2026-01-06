
// CONTROLLER D'AUTHENTIFICATION


/*
Ce controller gère :
- L'inscription
- La connexion
- La vérification du token
*/

// IMPORTS



const bcrypt = require('bcrypt');

//créer les tokens JWT
const jwt = require('jsonwebtoken');

//Pool de connexions MySQL
const db = require('../config/database');


//INSCRIPTION (REGISTER)

/*
Étapes :
1. Récupérer les données envoyées (username, email, password)
2. Vérifier si l'utilisateur existe déjà
3. Hasher le mot de passe
4. Insérer l'utilisateur en base de données
5. Renvoyer une confirmation
*/

exports.register = async (req, res) => {

    try {
        // ÉTAPE 1 : RÉCUPÉRER LES DONNÉES


        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Tous les champs sont obligatoires (username, password)'
            });
        }

        // ÉTAPE 2 : VÉRIFIER SI L'UTILISATEUR EXISTE DÉJÀ


        const [existingUsers] = await db.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        // Si un utilisateur existe déjà avec cet username
        if (existingUsers.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cet email ou ce nom d\'utilisateur est déjà utilisé'
            });
        }

        // ÉTAPE 3 : HASHER LE MOT DE PASSE


        const hashedPassword = await bcrypt.hash(password, 10);


        // ÉTAPE 4 : INSÉRER L'UTILISATEUR EN BASE

        const finalRole = role || 'user';

        const [result] = await db.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username,hashedPassword, finalRole]
        );


        // ÉTAPE 5 : RENVOYER UNE CONFIRMATION


        res.status(201).json({
            success: true,
            message: 'Compte créé avec succès',
            userId: result.insertId
        });

    } catch (error) {

        // GESTION DES ERREURS

        console.error('Erreur register:', error);

        res.status(500).json({
            success: false,
            message: 'Erreur lors de la création du compte'
        });
    }
};


// FONCTION 2 : CONNEXION (LOGIN)

/*
Étapes :
1. Récupérer email et password
2. Vérifier si l'utilisateur existe
3. Vérifier le mot de passe avec bcrypt.compare()
4. Créer un token JWT
5. Renvoyer le token au client
*/

exports.login = async (req, res) => {
    try {

        // ÉTAPE 1 : RÉCUPÉRER LES DONNÉES

        const {username,password } = req.body;


        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'identifiant et mot de passe requis'
            });
        }

        // ÉTAPE 2 : RÉCUPÉRER L'UTILISATEUR

        const [users] = await db.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        // Si aucun utilisateur trouvé
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'identifiants incorrect'
            });
        }

        // Il y a un utilisateur on le récup
        const user = users[0];


        // ÉTAPE 3 : VÉRIFIER LE MOT DE PASSE


        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Si le mot de passe est incorrect
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'identifiants ou mot de passe incorrect'
            });
        }


        // ÉTAPE 4 : CRÉER LE TOKEN JWT


        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '24h' }
        );


        // ÉTAPE 5 : RENVOYER LE TOKEN

        res.json({
            success: true,
            message: 'Connexion réussie',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Erreur login:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne lors de la connexion.'
        });
    }
};

// FONCTION 3 : VÉRIFIER LE TOKEN


/*
Utilisation :
- Quand l'utilisateur recharge la page
- Quand on veut vérifier qu'il est toujours connecté

Cette route doit utiliser le middleware verifyToken
Route : GET /api/auth/verify
Middleware : verifyToken
*/

exports.verifyTokenRoute = async (req, res) => {

    try {
        // VÉRIFIER QUE L'UTILISATEUR EXISTE ENCORE

        const [users] = await db.query(
            'SELECT id, username, role FROM users WHERE id = ?',
            [req.user.id]
        );

        // Si l'utilisateur n'existe plus
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé. Veuillez vous reconnecter.'
            });
        }

        // Renvoyer les infos à jour de l'utilisateur
        res.json({
            success: true,
            user: users[0]
        });

    } catch (error) {
        console.error('Erreur verifyToken:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la vérification'
        });
    }
};

// FONCTION 4 : DÉCONNEXION (LOGOUT)


exports.logout = async (req, res) => {
    res.json({
        success: true,
        message: 'Déconnexion réussie'
    });
};