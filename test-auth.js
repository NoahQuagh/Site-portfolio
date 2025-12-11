// ==============================================
// FICHIER test-auth.js
// ==============================================

const API_URL = 'http://localhost:3000/api/v1/auth'; // Vérifiez votre port si ce n'est pas 3000

// ==============================================
// 1. SIMULATION DE L'INSCRIPTION
// ==============================================
async function testRegister() {
    const uniqueId = Date.now();
    console.log('--- TEST 1 : INSCRIPTION (REGISTER) ---');
    const registerData = {
        username: `testadmin-${uniqueId}`,
        password: "securePassword123",
        role: "admin"
    };

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(`✅ SUCCÈS - Statut: ${response.status}`);
            console.log('    Réponse:', data);

            // 🚨 MODIFICATION ICI : Renvoyer le username et password pour le LOGIN
            return { username: registerData.username, password: registerData.password };
        } else {
            console.error(`❌ ÉCHEC - Statut: ${response.status}`);
            console.error('    Erreur:', data.message);

            if (response.status === 409) {
                console.log('    ⚠️ L\'utilisateur existe déjà (409). On passe au test de connexion.');

                // 🚨 MODIFICATION ICI : Renvoyer le username et password pour le LOGIN
                return { username: registerData.username, password: registerData.password };
            }
            return null;
        }

    } catch (error) {
        console.error('❌ ERREUR RÉSEAU/SERVEUR lors de l\'inscription:', error.message);
        return null;
    }
}

// ==============================================
// 2. SIMULATION DE LA CONNEXION
// ==============================================
async function testLogin(credentials) {
    if (!credentials) return;

    console.log('\n--- TEST 2 : CONNEXION (LOGIN) ---');

    // Le corps de la requête de connexion doit contenir l'identifiant (username) et le password
    const loginData = {
        username: credentials.username, // 🚨 CHANGEMENT : Utiliser 'username'
        password: credentials.password
    };

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData), // 🚨 Utiliser loginData
        });

        const data = await response.json();

        if (response.ok) { // Statut 200 OK
            console.log(`✅ SUCCÈS - Statut: ${response.status}`);
            console.log('    Token reçu:', data.token ? data.token.substring(0, 30) + '...' : 'Pas de token'); // Afficher une partie du token
            console.log('    Rôle utilisateur:', data.user.role);
            return data.token;
        } else { // Statut 401, 500, etc.
            console.error(`❌ ÉCHEC - Statut: ${response.status}`);
            console.error('    Erreur:', data.message);
            return null;
        }

    } catch (error) {
        console.error('❌ ERREUR RÉSEAU/SERVEUR lors de la connexion:', error.message);
        return null;
    }
}


// ==============================================
// 3. SIMULATION DE L'ACCÈS ADMIN SÉCURISÉ
// ==============================================
async function testAdminAccess(token) {
    console.log('\n--- TEST 3 : ACCÈS ADMIN SÉCURISÉ ---');

    // Cas 1 : Tentative SANS token (Doit échouer 403/401)
    console.log('    Tentative SANS token...');
    try {
        const noTokenResponse = await fetch(`http://localhost:3000/api/v1/menus/admin`, {
            method: 'GET',
        });
        const noTokenData = await noTokenResponse.json();

        if (noTokenResponse.status === 401 || noTokenResponse.status === 403) {
            console.log(`    ✅ SUCCÈS : Bloqué comme prévu. Statut: ${noTokenResponse.status}`);
        } else {
            console.error(`    ❌ ÉCHEC : Devrait être bloqué, mais a répondu ${noTokenResponse.status}`);
            console.error('        Message:', noTokenData.message);
        }
    } catch (error) {
        console.error('    ❌ ERREUR RÉSEAU/SERVEUR lors du test sans token:', error.message);
    }


    // Cas 2 : Tentative AVEC token valide (Doit réussir 200)
    if (!token) {
        console.log('    ⚠️ Impossible de tester AVEC token, le token n\'a pas été généré.');
        return;
    }

    console.log('    Tentative AVEC token valide...');
    try {
        const withTokenResponse = await fetch(`http://localhost:3000/api/v1/menus/admin`, {
            method: 'GET',
            headers: {
                // 🚨 C'EST ICI QU'ON ENVOIE LE TOKEN DANS L'EN-TÊTE AUTORIZATION
                'Authorization': `Bearer ${token}`
            },
        });

        const withTokenData = await withTokenResponse.json();

        if (withTokenResponse.ok) { // Statut 200 OK
            console.log(`    ✅ SUCCÈS : Accès accordé comme prévu. Statut: ${withTokenResponse.status}`);
            console.log(`        Menus trouvés: ${withTokenData.count}`);
        } else {
            console.error(`    ❌ ÉCHEC : Devrait réussir, mais a répondu ${withTokenResponse.status}`);
            console.error('        Message:', withTokenData.message);
        }

    } catch (error) {
        console.error('    ❌ ERREUR RÉSEAU/SERVEUR lors du test avec token:', error.message);
    }
}


// Mettre à jour la fonction runAuthTests pour appeler le nouveau test

async function runAuthTests() {
    console.log('==============================================');
    console.log('🚀 DÉMARRAGE DES TESTS D\'AUTHENTIFICATION ET SÉCURITÉ');
    console.log('==============================================');

    // TEST 1 & 2: Inscription et Connexion
    const credentials = await testRegister();
    let token = null;

    if (credentials) {
        token = await testLogin(credentials);
    }

    // TEST 3: Accès Admin
    if (token) {
        await testAdminAccess(token);
    } else {
        // Tester l'accès même sans token valide
        await testAdminAccess(null);
    }
}
runAuthTests()