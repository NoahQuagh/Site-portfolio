function GoRetour(){
    window.location.href = '../page/accueil.html';
}

// js/login.js

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    // Empêcher l'envoi classique du formulaire (qui rechargerait la page)
    e.preventDefault();

    // Récupérer les valeurs des champs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    // Nettoyer les messages précédents
    messageElement.textContent = '';

    // ===============================================
    // APPEL À L'API DE CONNEXION (VOTRE CONTROLLER)
    // ===============================================

    // Remplacez 'http://localhost:3000' par l'URL de votre API si elle est différente
    const API_URL = 'http://localhost:3000/api/v1/auth/login';

    try {
        const response = await fetch(API_URL, {
            method: 'POST', // On utilise la méthode POST, comme défini dans vos routes
            headers: {
                'Content-Type': 'application/json', // On indique que le corps est au format JSON
            },
            body: JSON.stringify({ // On envoie le nom d'utilisateur et le mot de passe au format JSON
                username: username,
                password: password,
            }),
        });

        // ===============================================
        // TRAITEMENT DE LA RÉPONSE DE L'API
        // ===============================================

        const data = await response.json(); // Récupérer le corps de la réponse JSON

        if (response.ok) {
            // Statut HTTP 200 (OK) - Connexion réussie selon votre contrôleur

            // 1. Stocker le token pour les prochaines requêtes sécurisées
            localStorage.setItem('authToken', data.token);

            // 2. Stocker les infos de l'utilisateur (optionnel, pour l'affichage)
            localStorage.setItem('userRole', data.user.role);

            // 3. Afficher le message de succès et rediriger
            console.log('Connexion reussie | redirection en cour')
            messageElement.style.display = 'none';

            // Rediriger vers la page d'administration ou le tableau de bord
            setTimeout(() => {
                window.location.href = '../page/accueilAdmin.html'; // Remplacez par votre URL d'admin
            }, 1000);

        } else {
            // Statut HTTP 400 ou 401 ou 500
            // Afficher le message d'erreur renvoyé par le contrôleur (ex: "identifiants incorrect")
            messageElement.textContent = data.message || 'Erreur de connexion inconnue.';
            messageElement.style.display = 'block';
        }

    } catch (error) {
        // Erreur réseau (serveur Node.js éteint, mauvaise URL, etc.)
        console.error('Erreur réseau ou interne:', error);
        messageElement.textContent = 'Erreur : Le serveur est injoignable.';
    }
});