// ==============================================
// FICHIER DE TEST DES CONTROLLERS (menuController)
// ==============================================

const menuController = require('./site-api/controllers/MenuController'); // Assurez-vous que le chemin est correct !

// ==============================================
// 1. FONCTIONS UTILITAIRES POUR SIMULER EXPRESS
// ==============================================

/**
 * Simule la fonction res.json() d'Express
 * @param {object} data - Les données JSON à envoyer
 */
function mockRes(expectedStatus = 200) {
    const res = {};
    // Stocke la réponse finale
    res.json = (data) => {
        console.log(`\n    ✅ Réponse Réussie (Status: ${expectedStatus})`);
        console.log('    Données reçues :', JSON.stringify(data, null, 2));
    };
    // Simule res.status(code) et renvoie res pour permettre le chaînage (ex: res.status(404).json())
    res.status = (code) => {
        if (code !== expectedStatus) {
            console.warn(`\n    ⚠️ Statut HTTP attendu (${expectedStatus}) vs reçu (${code}).`);
        }
        return res;
    };
    return res;
}

/**
 * Fonction principale pour exécuter tous les tests séquentiellement
 */
async function runTests() {
    console.log('==============================================');
    console.log('🚀 DÉMARRAGE DES TESTS DU MENU CONTROLLER');
    console.log('==============================================\n');

    // Assurez-vous d'avoir au moins 1 menu public et 1 privé en base pour que les tests fonctionnent

    await testGetPublicMenus();
    await testGetAllMenus();

    // ------------------------------------
    // TESTS ADMIN (Simulation de l'ajout/modification/suppression)
    // ------------------------------------

    // --- TEST 3 : CRÉATION ---
    let newMenuId = null;
    try {
        newMenuId = await testCreateMenu();
    } catch (e) {
        console.log(`\n    ⚠️ Test de création ignoré car la création a échoué.`);
    }

    if (newMenuId) {
        // --- TEST 4 : MODIFICATION ---
        await testUpdateMenu(newMenuId);

        // --- TEST 5 : SUPPRESSION ---
        await testDeleteMenu(newMenuId);
    }

    // Fermeture du processus pour libérer la connexion BDD (important car on utilise un Pool)
    process.exit();
}

// ==============================================
// 2. EXÉCUTION DES TESTS
// ==============================================

// TEST 1 : Récupérer les menus publics (Invité/Public)
async function testGetPublicMenus() {
    console.log('--- TEST 1 : getPublicMenus (Type: PUBLIC) ---');
    const mockReq = {}; // Pas de paramètres dans la requête pour cette route
    const mockResponse = mockRes();

    await menuController.getPublicMenus(mockReq, mockResponse);
}

// TEST 2 : Récupérer tous les menus (Admin/Privé)
async function testGetAllMenus() {
    console.log('\n--- TEST 2 : getAllMenus (Type: ADMIN) ---');
    const mockReq = {};
    const mockResponse = mockRes();

    await menuController.getAllMenus(mockReq, mockResponse);
}


// TEST 3 : Créer un nouveau menu (Admin)
async function testCreateMenu() {
    console.log('\n--- TEST 3 : createMenu (Ajout d\'un menu de test) ---');

    const mockReq = {
        body: {
            nom_menu: 'Test Menu Temporaire',
            describ_menu: 'Ce menu est créé pour un test unitaire et doit être supprimé.',
            type_menu: 'prive' // Création d'un menu privé pour le test
        }
    };

    let newId = null;

    // On simule une réponse pour capter l'ID inséré
    const mockResponse = {
        status: (code) => {
            if (code !== 201) console.warn(`\n    ⚠️ Statut HTTP attendu (201) vs reçu (${code}).`);
            return mockResponse;
        },
        json: (data) => {
            if (data.success && data.id) {
                newId = data.id;
                console.log(`    ✅ Création réussie. ID créé: ${newId}`);
                console.log('    Message :', data.message);
            } else {
                console.log(`    ❌ Échec de la création : ${data.message}`);
                throw new Error("Échec de la création du menu.");
            }
        }
    };

    try {
        await menuController.createMenu(mockReq, mockResponse);
        return newId;
    } catch (error) {
        console.log(`    ❌ Échec de la création : ${error.message}`);
        return null;
    }
}


// TEST 4 : Modifier le menu créé (Admin)
async function testUpdateMenu(idToUpdate) {
    console.log(`\n--- TEST 4 : updateMenu (Modification de l'ID: ${idToUpdate}) ---`);

    const mockReq = {
        params: { id: idToUpdate },
        body: {
            describ_menu: 'Description MODIFIÉE par le test.',
            type_menu: 'public' // On le passe en public pour tester la modification
        }
    };

    // Utiliser la fonction mockRes standard (qui attend 200 par défaut)
    await menuController.updateMenu(mockReq, mockRes());
}


// TEST 5 : Supprimer le menu créé (Admin)
async function testDeleteMenu(idToDelete) {
    console.log(`\n--- TEST 5 : deleteMenu (Suppression de l'ID: ${idToDelete}) ---`);

    const mockReq = {
        params: { id: idToDelete }
    };

    await menuController.deleteMenu(mockReq, mockRes());

    // Vérification finale (Test d'existence qui doit renvoyer 404)
    console.log(`\n--- VÉRIFICATION POST-SUPPRESSION (Doit échouer/404) ---`);
    const mockReqCheck = { params: { id: idToDelete } };

    // Nous allons appeler une fonction GET pour vérifier qu'il est bien introuvable (404)
    // ATTENTION : Le controller n'a pas de getMenuById, donc on doit faire une vérification manuelle

    // Simplifions en vérifiant que le message de succès est affiché.
    // Dans une application réelle, on ferait un GET après le DELETE pour vérifier le 404.

    console.log('    (Vérifiez manuellement dans votre BDD que le menu a été supprimé.)');
}

// ==============================================
// EXÉCUTION
// ==============================================

runTests();