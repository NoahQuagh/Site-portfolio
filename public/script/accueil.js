// ==============================================
// FICHIER JS CÔTÉ CLIENT (FRONTEND)
// ==============================================

const API_MENU_URL = 'http://localhost:3000/api/v1/menus';

async function chargerMenus() {
    try {
        // 1. Appel de l'API
        const response = await fetch(API_MENU_URL);

        // Vérifier si la réponse HTTP est OK (statut 200)
        if (!response.ok) {
            // Lancer une erreur si le statut est 404, 500, etc.
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }

        // 2. Convertir la réponse en objet JavaScript (JSON)
        const data = await response.json();

        // Les données des menus sont dans data.data
        const menus = data.data;

        // 3. Afficher les menus sur la page
        afficherMenusSurLeSite(menus);

    } catch (error) {
        console.error("Impossible de charger les menus:", error);
        // Afficher un message d'erreur pour l'utilisateur
        document.getElementById('menu-list').innerHTML = '<li>Erreur lors du chargement.</li>';
    }
}


function afficherMenusSurLeSite(menus) {
    // 🚨 ASSUME QUE VOUS AVEZ UN ÉLÉMENT UL AVEC L'ID "menu-list" DANS VOTRE HTML
    const menuList = document.getElementById('menu-list');

    if (!menuList) {
        console.error("L'élément #menu-list n'est pas trouvé dans le HTML.");
        return;
    }

    // Vider le contenu existant
    menuList.innerHTML = '';

    // Parcourir chaque menu et créer un élément de liste (<li>)
    menus.forEach(menu => {
        const listItem = document.createElement('li');

        // Utilisation des données du JSON pour l'affichage
        // Ex: Qui suis-je (détaile de que qui je suis...)
        listItem.innerHTML = `
            <a href="#">
                <strong>${menu.nom_menu}</strong>
                <p>${menu.describ_menu}</p>
            </a>
        `;

        menuList.appendChild(listItem);
    });
}

// Lancer le chargement des menus au démarrage de la page
document.addEventListener('DOMContentLoaded', chargerMenus);
