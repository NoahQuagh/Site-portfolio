// ==============================================
// CONTROLLER DES MENUS
// ==============================================

/*
Ce controller gère :
- Récupérer les menus PUBLIC (READ - public/invité)
- Récupérer TOUS les menus (READ - admin/privé)
- Créer un menu (CREATE - admin only)
- Modifier un menu (UPDATE - admin only)
- Supprimer un menu (DELETE - admin only)
*/

// ==============================================
// IMPORTS
// ==============================================

const db = require('../config/database');

// ==============================================
// FONCTION 1 : RÉCUPÉRER LES MENUS PUBLIC (POUR L'INVITÉ)
// ==============================================

/*
Cette fonction récupère uniquement les menus dont type_menu est 'public'
Route PUBLIC : affichage pour les utilisateurs non connectés
*/

exports.getPublicMenus = async (req, res) => {
    try {
        console.log('Récupération des menus PUBLIC...');

        // Requête pour récupérer les menus de type 'public'
        const [menus] = await db.query(
            'SELECT id_menu, nom_menu, describ_menu, type_menu FROM portfolio_menu_admin WHERE type_menu = ? ORDER BY id_menu ASC',
            ['public']
        );

        // ==============================================
        // RENVOYER LES DONNÉES
        // ==============================================

        res.json({
            success: true,
            count: menus.length,  // Nombre de menus publics
            data: menus
        });

    } catch (error) {
        console.error('Erreur getPublicMenus:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des menus publics'
        });
    }
};

// ==============================================
// FONCTION 2 : RÉCUPÉRER TOUS LES MENUS (POUR L'ADMIN)
// ==============================================

/*
Cette fonction récupère tous les menus (publics et privés)
Route ADMIN ONLY : affichage pour l'interface d'administration
*/

exports.getAllMenus = async (req, res) => {
    try {
        console.log("Récupération de TOUS les menus (Admin)...");

        // Requête pour récupérer tous les menus
        const [menus] = await db.query(
            'SELECT id_menu, nom_menu, describ_menu, type_menu FROM portfolio_menu_admin ORDER BY id_menu ASC'
        );

        // ==============================================
        // RENVOYER LES DONNÉES
        // ==============================================

        res.json({
            success: true,
            count: menus.length,  // Nombre total de menus
            data: menus
        });

    } catch (error) {
        console.error('Erreur getAllMenus:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération de tous les menus'
        });
    }
};


// ==============================================
// FONCTION 3 : CRÉER UN MENU
// ==============================================

/*
Cette fonction crée un nouveau menu
Route ADMIN ONLY
*/

exports.createMenu = async (req, res) => {
    try {
        // ==============================================
        // RÉCUPÉRER LES DONNÉES
        // ==============================================

        const {
            nom_menu,
            describ_menu,
            type_menu       // Doit être 'public' ou 'prive'
        } = req.body;

        // ==============================================
        // VALIDATION DES DONNÉES
        // ==============================================

        if (!nom_menu || !type_menu) {
            return res.status(400).json({
                success: false,
                message: 'Le nom du menu et le type (public/prive) sont obligatoires'
            });
        }

        // S'assurer que le type est valide
        if (!['public', 'prive'].includes(type_menu.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: "Le type_menu doit être 'public' ou 'prive'"
            });
        }

        // ==============================================
        // INSÉRER EN BASE DE DONNÉES
        // ==============================================

        const [result] = await db.query(
            `INSERT INTO portfolio_menu_admin
                 (nom_menu, describ_menu, type_menu)
             VALUES (?, ?, ?)`,
            [
                nom_menu,
                describ_menu || null, // Permet de laisser la description optionnelle
                type_menu
            ]
        );

        // ==============================================
        // RENVOYER LA CONFIRMATION
        // ==============================================

        res.status(201).json({
            success: true,
            message: 'Menu créé avec succès',
            id: result.insertId
        });

    } catch (error) {
        console.error('Erreur createMenu:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la création du menu' // Rétablir le message générique
        });
    }
};
// ==============================================
// FONCTION 4 : MODIFIER UN MENU
// ==============================================

/*
Cette fonction modifie un menu existant
Route ADMIN ONLY
*/

exports.updateMenu = async (req, res) => {
    try {
        // ==============================================
        // RÉCUPÉRER L'ID ET LES DONNÉES
        // ==============================================

        const { id } = req.params;       // id_menu à modifier
        const updateData = req.body;     // Données à modifier

        // ==============================================
        // VÉRIFIER QUE LE MENU EXISTE
        // ==============================================

        const [existingMenu] = await db.query(
            'SELECT id_menu FROM portfolio_menu_admin WHERE id_menu = ?',
            [id]
        );

        if (existingMenu.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Menu non trouvé'
            });
        }

        // ==============================================
        // CONSTRUIRE LA REQUÊTE UPDATE DYNAMIQUE
        // ==============================================

        const fields = Object.keys(updateData);
        const values = Object.values(updateData);

        if (fields.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Aucune donnée à modifier'
            });
        }

        // Construire la clause SET : "nom_menu = ?, describ_menu = ?, ..."
        const setClause = fields.map(field => `${field} = ?`).join(', ');

        // ==============================================
        // EXÉCUTER LA REQUÊTE UPDATE
        // ==============================================

        const [result] = await db.query(
            `UPDATE portfolio_menu_admin SET ${setClause} WHERE id_menu = ?`,
            [...values, id]
        );

        // 🚨 AJOUT DE LOGS POUR VÉRIFIER LE NOMBRE DE LIGNES MODIFIÉES
        console.log(`[DEBUG UPDATE] ID: ${id}, Lignes affectées: ${result.affectedRows}`);

        // RENVOYER LA CONFIRMATION
        res.json({
            success: true,
            message: 'Menu mis à jour avec succès' // Pas besoin de changer le message JSON ici
        });

    } catch (error) {
        console.error('Erreur updateMenu:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la mise à jour du menu'
        });
    }
};

// ==============================================
// FONCTION 5 : SUPPRIMER UN MENU
// ==============================================

/*
Cette fonction supprime un menu
Route ADMIN ONLY
*/

// DANS MenuController.js (Fonction deleteMenu)

exports.deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;

        // ==============================================
        // VÉRIFIER QUE LE MENU EXISTE
        // ==============================================
        const [existingMenu] = await db.query(
            'SELECT id_menu FROM portfolio_menu_admin WHERE id_menu = ?',
            [id]
        );

        if (existingMenu.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Menu non trouvé'
            });
        }

        // ==============================================
        // SUPPRIMER LE MENU ET CAPTURER LE RÉSULTAT
        // ==============================================
        const [result] = await db.query('DELETE FROM portfolio_menu_admin WHERE id_menu = ?', [id]);

        // 🚨 AJOUT DE LOGS POUR VÉRIFIER LE NOMBRE DE LIGNES SUPPRIMÉES
        console.log(`[DEBUG DELETE] ID: ${id}, Lignes affectées: ${result.affectedRows}`);

        // ==============================================
        // RENVOYER LA CONFIRMATION
        // ==============================================
        res.json({
            success: true,
            message: `Menu supprimé avec succès. Lignes affectées: ${result.affectedRows}`
        });

    } catch (error) {
        // En cas d'échec SQL inattendu
        console.error('Erreur deleteMenu DÉTAILLÉE:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la suppression du menu'
        });
    }
};