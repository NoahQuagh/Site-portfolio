// ==============================================
// FICHIER routes/menuRoutes.js
// ==============================================

const express = require('express');
const router = express.Router();
const menuController = require('../site-api/controllers/MenuController'); // Assurez-vous du chemin
const authMiddleware = require('../site-api/middleware/auth');

// ==============================================
// DÉFINITION DES ROUTES MENUS
// ==============================================

// 1. PUBLIC : Récupérer uniquement les menus de type 'public' (pour l'invité)
// Route : GET /api/v1/menus
router.get('/', menuController.getPublicMenus);


// -----------------------------------------------------
// ROUTES ADMINISTRATEUR (Nécessitent une authentification)
// -----------------------------------------------------

// 2. ADMIN : Récupérer TOUS les menus (publics et privés)
// Route : GET /api/v1/menus/admin
// router.get('/admin', authMiddleware.verifyToken, authMiddleware.isAdmin, menuController.getAllMenus);
router.get('/admin',
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    menuController.getAllMenus
);

// 3. ADMIN : Créer un nouveau menu
// Route : POST /api/v1/menus
// router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, menuController.createMenu);
router.post('/',
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    menuController.createMenu
);

// 4. ADMIN : Modifier un menu par ID
// Route : PUT /api/v1/menus/:id
// router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, menuController.updateMenu);
router.put('/:id',
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    menuController.updateMenu
);

// 5. ADMIN : Supprimer un menu par ID
// Route : DELETE /api/v1/menus/:id
// router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, menuController.deleteMenu);
router.delete('/:id',
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    menuController.deleteMenu
);


module.exports = router;