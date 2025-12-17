// ==============================================
// FICHIER JS CÔTÉ CLIENT (FRONTEND)
// ==============================================

const API_MENU_URL = 'http://localhost:3000/api/v1/menus';

document.addEventListener('DOMContentLoaded', function() {
    const navPills = document.getElementById('customNav');
    if (!navPills) return;

    const indicator = navPills.querySelector('.indicator');
    const navItems = navPills.querySelectorAll('.nav-item');
    const navLinks = navPills.querySelectorAll('.nav-link');

    // Valeurs du padding du conteneur (CSS: 10px 20px)
    const PADDING_VERTICAL = 10;
    const PADDING_HORIZONTAL_START = 20;

    function updateIndicator(activeLink) {
        if (!activeLink) {
            activeLink = navPills.querySelector('.nav-link.active');
        }

        if (activeLink) {
            const activeItem = activeLink.closest('.nav-item');
            if (!activeItem) return;

            // --- Calcul de Position et Taille ---
            const itemRect = activeItem.getBoundingClientRect();
            const navRect = navPills.getBoundingClientRect();

            // 1. Hauteur : Hauteur totale du UL moins 2x Padding Vertical
            const navHeight = navPills.offsetHeight;
            const indicatorHeight = navHeight - (2 * PADDING_VERTICAL);

            // 2. Largeur : Largeur de l'élément LI
            const width = activeItem.offsetWidth;

            // 3. Décalage (Translation) : Distance entre le bord gauche du LI et le bord gauche du UL,
            //    moins le padding gauche de 20px de l'UL.
            const leftOffset = itemRect.left - navRect.left - PADDING_HORIZONTAL_START;

            // --- Application des Styles ---
            indicator.style.width = `${width}px`;
            indicator.style.height = `${indicatorHeight}px`;
            indicator.style.transform = `translateX(${leftOffset}px)`;

            indicator.style.opacity = '1';
        } else {
            indicator.style.opacity = '0';
        }
    }

    function handleNavClick(event) {
        const clickedLink = event.currentTarget;

        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        clickedLink.classList.add('active');

        updateIndicator(clickedLink);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Initialisation et gestion de la hauteur
    setTimeout(() => {
        updateIndicator();
    }, 50);

    // Gérer le redimensionnement pour recalculer les largeurs auto
    window.addEventListener('resize', () => updateIndicator());
});


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

// Fonction générique pour changer le contenu avec animation
function changeContent(elementId, newContent, duration = 500) {
    const element = document.getElementById(elementId);

    if (!element) {
        console.error(`Élément #${elementId} non trouvé`);
        return;
    }

    // 1. Ajouter la classe de transition (fade out)
    element.classList.add('transitioning');

    // 2. Attendre la fin de l'animation
    setTimeout(() => {
        // Changer le contenu
        element.innerHTML = newContent;

        // 3. Retirer la classe (fade in)
        element.classList.remove('transitioning');
    }, duration);
}

// Utilisation
function accueil() {
    const content = `
        <div class="body-accueil-2">
            <div class="titre">
                <h2>NOAH</h2>
                <h1>QUAGHEBEUR</h1>
                <p>Développeur Web et d'Application et gestion de base de données</p>
            </div>
            <div class="boiteCercle">
            </div>
        </div>
    `;

    changeContent('body-accueil', content);
}

function profile() {
    const content = `
        <div class="body-accueil-2">
            <h2>Mon Profil</h2>
            <p>Contenu du profil...</p>
        </div>
    `;

    changeContent('body-accueil', content);
}

function contact(){
    const content = `
        <div class="body-accueil-2">
            <h2>Mon Conctact</h2>
            <p>Contenu du profil...</p>
        </div>
    `;

    changeContent('body-accueil', content);
}

function parcours(){
    const content = `
        <div class="body-accueil-2">
            <h2>Mon parcours</h2>
            <p>Contenu du profil...</p>
        </div>
    `;

    changeContent('body-accueil', content);
}

function projet(){
    const content = `
        <div class="body-accueil-2">
            <h2>Mes projets</h2>
            <p>Contenu du profil...</p>
        </div>
    `;

    changeContent('body-accueil', content);
}

function service(){
    const content = `
        <div class="body-accueil-2">
            <h2>Mes services</h2>
            <p>Contenu du profil...</p>
        </div>
    `;

    changeContent('body-accueil', content);
}

function comptence(){
    const content = `
        <div class="body-accueil-2">
            <h2>Mes competence</h2>
            <p>Contenu du profil...</p>
        </div>
    `;

    changeContent('body-accueil', content);
}

function experience(){
    const content = `
        <div class="body-accueil-2">
            <h2>Mon experience</h2>
            <p>Contenu du profil...</p>
        </div>
    `;

    changeContent('body-accueil', content);
}







function GoConnexion(){
    window.location.href = '../page/connexion.html';
}


// Lancer le chargement des menus au démarrage de la page
document.addEventListener('DOMContentLoaded', chargerMenus);
accueil()

