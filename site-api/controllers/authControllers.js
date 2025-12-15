// ==============================================
// CONTROLLER D'AUTHENTIFICATION
// ==============================================

/*
Ce controller gère :
- L'inscription (register)
- La connexion (login)
- La vérification du token (verifyToken)
*/

// ==============================================
// IMPORTS
// ==============================================

// bcrypt : Pour hasher et comparer les mots de passe
const bcrypt = require('bcrypt');

// jsonwebtoken : Pour créer les tokens JWT
const jwt = require('jsonwebtoken');

// db : Pool de connexions MySQL
const db = require('../config/database');

// ==============================================
// FONCTION 1 : INSCRIPTION (REGISTER)
// ==============================================

/*
Cette fonction permet de créer un nouveau compte utilisateur

Étapes :
1. Récupérer les données envoyées (username, email, password)
2. Vérifier si l'utilisateur existe déjà
3. Hasher le mot de passe
4. Insérer l'utilisateur en base de données
5. Renvoyer une confirmation
*/

exports.register = async (req, res) => {
    /*
    req.body contient les données envoyées par le client
    Exemple de requête :
    POST /api/auth/register
    Body: {
        "username": "john",
        "password": "Password123!"
    }
    */

    try {
        // ==============================================
        // ÉTAPE 1 : RÉCUPÉRER LES DONNÉES
        // ==============================================

        const { username, password, role } = req.body;

        // Vérifier que tous les champs sont présents
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Tous les champs sont obligatoires (username, password)'
            });
        }

        // ==============================================
        // ÉTAPE 2 : VÉRIFIER SI L'UTILISATEUR EXISTE DÉJÀ
        // ==============================================

        /*
        Requête SQL avec paramètres préparés (sécurisé contre les injections SQL)

        Pourquoi utiliser des ? :
        ❌ DANGEREUX : 'SELECT * FROM users WHERE email = "' + email + '"'
        → Si email = 'test@test.com" OR 1=1 --', on récupère TOUS les utilisateurs !

        ✅ SÉCURISÉ : 'SELECT * FROM users WHERE email = ?', [email]
        → MySQL échappe automatiquement les caractères dangereux

        Le [rows] utilise la déstructuration :
        const result = await db.query(...) retourne [rows, fields]
        On ne garde que rows (les données)
        */

        const [existingUsers] = await db.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        // Si un utilisateur existe déjà avec cet username
        if (existingUsers.length > 0) {
            /*
            status(400) = HTTP 400 Bad Request
            → La requête est invalide (l'utilisateur existe déjà)
            */
            return res.status(400).json({
                success: false,
                message: 'Cet email ou ce nom d\'utilisateur est déjà utilisé'
            });
        }

        // ==============================================
        // ÉTAPE 3 : HASHER LE MOT DE PASSE
        // ==============================================

        /*
        bcrypt.hash() transforme le mot de passe en un hash illisible

        Paramètres :
        - password : Le mot de passe en clair
        - 10 : Nombre de "rounds" de hashage (plus c'est élevé, plus c'est sécurisé mais lent)

        Exemple :
        "Password123!" → "$2b$10$abc123xyz..."

        IMPOSSIBLE de retrouver "Password123!" à partir du hash !

        Temps de hashage selon le nombre de rounds :
        - 10 rounds : ~150ms (recommandé)
        - 12 rounds : ~600ms (très sécurisé)
        - 15 rounds : ~5 secondes (trop lent pour une API)
        */

        const hashedPassword = await bcrypt.hash(password, 10);

        // ==============================================
        // ÉTAPE 4 : INSÉRER L'UTILISATEUR EN BASE
        // ==============================================

        /*
        INSERT INTO : Ajouter une nouvelle ligne dans la table

        Pourquoi ne pas mettre le rôle dans req.body ?
        → Sécurité ! Un utilisateur malveillant pourrait envoyer role: 'admin'
        → On force le rôle à 'user' par défaut
        → Seul un admin existant peut créer d'autres admins (avec une route séparée)
        */
        const finalRole = role || 'user';

        const [result] = await db.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username,hashedPassword, finalRole]
        );

        // ==============================================
        // ÉTAPE 5 : RENVOYER UNE CONFIRMATION
        // ==============================================

        /*
        status(201) = HTTP 201 Created
        → Une nouvelle ressource a été créée avec succès

        result.insertId contient l'ID auto-généré du nouvel utilisateur
        */

        res.status(201).json({
            success: true,
            message: 'Compte créé avec succès',
            userId: result.insertId
        });

    } catch (error) {
        // ==============================================
        // GESTION DES ERREURS
        // ==============================================

        /*
        console.error() affiche l'erreur dans les logs du serveur
        (visible uniquement côté serveur, pas côté client)
        */
        console.error('Erreur register:', error);

        /*
        status(500) = HTTP 500 Internal Server Error
        → Erreur interne du serveur (problème BDD, erreur de code, etc.)

        On ne renvoie JAMAIS les détails de l'erreur au client (sécurité)
        Les détails sont dans les logs serveur
        */
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la création du compte'
        });
    }
};

// ==============================================
// FONCTION 2 : CONNEXION (LOGIN)
// ==============================================

/*
Cette fonction permet à un utilisateur de se connecter

Étapes :
1. Récupérer email et password
2. Vérifier si l'utilisateur existe
3. Vérifier le mot de passe avec bcrypt.compare()
4. Créer un token JWT
5. Renvoyer le token au client
*/

exports.login = async (req, res) => {
    try {
        // ==============================================
        // ÉTAPE 1 : RÉCUPÉRER LES DONNÉES
        // ==============================================
        const {username,password } = req.body;

        // Vérifier que tous les champs sont présents
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'identifiant et mot de passe requis'
            });
        }

        // ==============================================
        // ÉTAPE 2 : RÉCUPÉRER L'UTILISATEUR
        // ==============================================

        /*
        On récupère l'utilisateur par email
        On a besoin du mot de passe hashé pour le comparer
        */

        const [users] = await db.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        // Si aucun utilisateur trouvé
        if (users.length === 0) {
            /*
            status(401) = HTTP 401 Unauthorized
            → Les identifiants sont incorrects

            ⚠️ SÉCURITÉ : On ne dit PAS "email n'existe pas"
            Sinon un attaquant peut tester des emails pour savoir qui a un compte
            On dit juste "email ou mot de passe incorrect"
            */
            return res.status(401).json({
                success: false,
                message: 'identifiants incorrect'
            });
        }

        // Il y a un utilisateur, on le récupère
        const user = users[0];

        // ==============================================
        // ÉTAPE 3 : VÉRIFIER LE MOT DE PASSE
        // ==============================================

        /*
        bcrypt.compare() compare le mot de passe en clair avec le hash

        Comment ça marche ?
        1. bcrypt prend le mot de passe entré : "Password123!"
        2. bcrypt le hashe avec le MÊME salt que le hash stocké
        3. bcrypt compare les deux hashs

        Exemple :
        Password entré : "Password123!"
        Hash en BDD    : "$2b$10$abc123xyz..."

        bcrypt.compare("Password123!", "$2b$10$abc123xyz...")
        → hash "Password123!" avec le salt de "$2b$10$abc123xyz..."
        → compare les deux hashs
        → retourne true si identiques, false sinon

        Retourne : true ou false
        */

        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Si le mot de passe est incorrect
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'identifiants ou mot de passe incorrect'
            });
        }

        // ==============================================
        // ÉTAPE 4 : CRÉER LE TOKEN JWT
        // ==============================================

        /*
        jwt.sign() crée un token JWT

        Paramètres :
        1. PAYLOAD : Les données à stocker dans le token
           ⚠️ Ne JAMAIS mettre le mot de passe dans le token !
           ⚠️ Ne pas mettre trop de données (le token est envoyé à chaque requête)

        2. SECRET : La clé secrète (process.env.JWT_SECRET)

        3. OPTIONS : Configuration
           - expiresIn : Durée de validité du token
             Formats possibles : '24h', '7d', '60s', '30m'

        Le token contient :
        - Les données du payload (id, username, email, role)
        - La date de création (iat = issued at)
        - La date d'expiration (exp)
        */

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '24h' }
        );

        // ==============================================
        // ÉTAPE 5 : RENVOYER LE TOKEN
        // ==============================================

        /*
        On renvoie :
        - Le token (à stocker côté client dans localStorage)
        - Les infos utilisateur (pour afficher "Bienvenue, John")

        ⚠️ On ne renvoie PAS le mot de passe !
        */

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

// ==============================================
// FONCTION 3 : VÉRIFIER LE TOKEN
// ==============================================

/*
Cette fonction vérifie si le token de l'utilisateur est toujours valide

Utilisation :
- Quand l'utilisateur recharge la page
- Quand on veut vérifier qu'il est toujours connecté

⚠️ Cette route doit utiliser le middleware verifyToken
Route : GET /api/auth/verify
Middleware : verifyToken
*/

exports.verifyTokenRoute = async (req, res) => {
    /*
    À ce stade, le middleware verifyToken a déjà vérifié le token
    Si on arrive ici, c'est que le token est valide

    req.user contient les données décodées du token
    (créé par le middleware verifyToken)
    */

    try {
        // ==============================================
        // VÉRIFIER QUE L'UTILISATEUR EXISTE ENCORE
        // ==============================================

        /*
        Même si le token est valide, il faut vérifier que :
        - L'utilisateur n'a pas été supprimé entre temps
        - Le compte n'a pas été désactivé
        - Les infos sont à jour
        */

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

// ==============================================
// FONCTION 4 : DÉCONNEXION (LOGOUT)
// ==============================================

/*
La déconnexion avec JWT est CÔTÉ CLIENT uniquement
Le serveur n'a pas besoin de faire quoi que ce soit

Pourquoi ?
- JWT est stateless (sans état)
- Le serveur ne garde pas de trace des tokens
- Il suffit que le client supprime le token de localStorage

Cette fonction existe juste pour renvoyer une confirmation
*/

exports.logout = async (req, res) => {
    /*
    Côté client, le logout se fait comme ça :
    localStorage.removeItem('authToken');
    window.location.href = '/';

    Cette route renvoie juste une confirmation
    */

    res.json({
        success: true,
        message: 'Déconnexion réussie'
    });
};