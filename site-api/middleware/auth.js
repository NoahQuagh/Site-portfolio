const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    // Si pas de token, refuser l'accès
    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'Token d\'authentification requis. Veuillez vous connecter.'
        });
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        let message = 'Token invalide ou expiré. Veuillez vous reconnecter.';

        if (error.name === 'TokenExpiredError') {
            message = 'Votre session a expiré. Veuillez vous reconnecter.';
        } else if (error.name === 'JsonWebTokenError') {
            message = 'Token invalide. Veuillez vous reconnecter.';
        }

        return res.status(401).json({
            success: false,
            message: message
        });
    }
};

const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            success: false,
            message: 'Erreur de configuration du serveur'
        });
    }

    // Vérifier le rôle
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Accès refusé. Droits administrateur requis.'
        });
    }
    next();
};

const isUser = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            success: false,
            message: 'Erreur de configuration du serveur'
        });
    }

    if (req.user.role !== 'user') {
        return res.status(403).json({
            success: false,
            message: 'Accès refusé. Cette action est réservée aux utilisateurs.'
        });
    }

    next();
};


module.exports = {
    verifyToken,   // Vérifie si l'utilisateur est connecté
    isAdmin,       // Vérifie si l'utilisateur est admin
    isUser         // Vérifie si l'utilisateur est user normal
};