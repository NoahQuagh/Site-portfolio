const API_MENU_URL = 'http://localhost:3000/api/v1/menus';


function navigation() {
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

function LigneSuivante(){
    const fenetre = document.getElementById('terminal-output');
    fenetre.innerHTML += `
                <div class="output-line" id="output-line"><br><span class="prompt">PS C:\\Users\\Noah&gt;</span><input type="text" id="terminal-input" autofocus autocomplete="off"></div>`;

    fenetre.scrollTop = fenetre.scrollHeight;

    const nouvelInput = document.getElementById('terminal-input');
    if (nouvelInput) {
        nouvelInput.addEventListener('keydown', validerSaisie);
        nouvelInput.focus();
    }
}


function validerSaisie(event) {
    if (event.key === "Enter") {
        const valeur = event.target.value.toLowerCase().trim(); // On normalise la saisie
        const fenetre = document.getElementById('terminal-output');
        const ligneActuelle = document.getElementById('output-line');

        if (event.target.id === "terminal-input") {
            if (valeur !== "") {

                ligneActuelle.innerHTML = `<br><span class="prompt">PS C:\\Users\\Noah&gt; <span class="success">${valeur}</span></span>`;
                ligneActuelle.id = "";

                if (valeur === "cd parcours") {
                    parcours();

                    const navLinks = document.querySelectorAll('.nav-link');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-name') === 'parcours' || link.textContent.includes('PARCOURS')) {
                            link.classList.add('active');
                        }
                    });

                    setTimeout(() => {
                        navigation();
                    }, 100);
                    LigneSuivante();

                } else if (valeur === "cd projets") {
                    projet();

                    const navLinks = document.querySelectorAll('.nav-link');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-name') === 'projet' || link.textContent.includes('PROJETS')) {
                            link.classList.add('active');
                        }
                    });

                    setTimeout(() => {
                        navigation();
                    }, 100);

                    LigneSuivante();

                } else if (valeur === "cd competences") {
                    comptence();

                    const navLinks = document.querySelectorAll('.nav-link');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-name') === 'competence' || link.textContent.includes('COMPETENCES')) {
                            link.classList.add('active');
                        }
                    });

                    setTimeout(() => {
                        navigation();
                    }, 100);

                    LigneSuivante();

                } else if (valeur === "cd expériences") {
                    experience();

                    const navLinks = document.querySelectorAll('.nav-link');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-name') === 'experience' || link.textContent.includes('EXPÉRIENCE')) {
                            link.classList.add('active');
                        }
                    });

                    setTimeout(() => {
                        navigation();
                    }, 100);

                    LigneSuivante();

                } else if (valeur === "help") {


                    fenetre.innerHTML += `
                    <div class="output-line info"><br>LISTE DES COMMANDES DISPONIBLES</div>
                    <div class="output-line info" style="color:#4ade80">   help</div>
                    <div class="output-line info" style="color:#4ade80">   cd parcours</div>
                    <div class="output-line info" style="color:#4ade80">   cd projets</div>
                    <div class="output-line info" style="color:#4ade80">   cd competences</div>
                    <div class="output-line info" style="color:#4ade80">   cd expériences</div>
                    <div class="output-line info" style="color:#4ade80">   cd connexion</div>
                    <div class="output-line info" style="color:#4ade80">   ./bio</div>
                    <div class="output-line info" style="color:#4ade80">   ./moi</div>
                    <div class="output-line info" style="color:#4ade80">   ./jeu</div>
                    `;

                    LigneSuivante();
                }else if (valeur === "cd connexion"){
                    GoConnexion();
                    LigneSuivante();

                }else if (valeur === "./bio"){
                    fenetre.innerHTML += `
                    <div class="output-line info"><br>[ <span class="cyan">BIO</span> ] blablablablablablablablablablablablablablabla</div>
                    `;
                    LigneSuivante();
                }else if (valeur === "./moi"){
                    fenetre.innerHTML += `
                        <div class="ascii-container">
                <div class="ascii-art">
     /$$   /$$  /$$$$$$   /$$$$$$  /$$   /$$
    | $$$ | $$ /$$__  $$ /$$__  $$| $$  | $$
    | $$$$| $$| $$  \\ $$| $$  \\ $$| $$  | $$
    | $$ $$ $$| $$  | $$| $$$$$$$$| $$$$$$$$      
    | $$  $$$$| $$  | $$| $$__  $$| $$__  $$      
    | $$\\  $$$| $$  | $$| $$  | $$| $$  | $$      
    | $$ \\  $$|  $$$$$$/| $$  | $$| $$  | $$      
    |__/  \\__/ \\______/ |__/  |__/|__/  |__/       
                                      
                </div>
            </div>
        <p class="terminal-line">
            <div class="ascii-container">
                <div class="ascii-art">
      /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$$ /$$$$$$$  /$$$$$$$$ /$$   /$$ /$$$$$$$
     /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$| $$  | $$| $$_____/| $$__  $$| $$_____/| $$  | $$| $$__  $$
    | $$  \\ $$| $$  | $$| $$  \\ $$| $$  \\__/| $$  | $$| $$      | $$  \\ $$| $$      | $$  | $$| $$  \\ $$
    | $$  | $$| $$  | $$| $$$$$$$$| $$ /$$$$| $$$$$$$$| $$$$$   | $$$$$$$ | $$$$$   | $$  | $$| $$$$$$$/
    | $$  | $$| $$  | $$| $$__  $$| $$|_  $$| $$__  $$| $$__/   | $$__  $$| $$__/   | $$  | $$| $$__  $$
    | $$/$$ $$| $$  | $$| $$  | $$| $$  \\ $$| $$  | $$| $$      | $$  \\ $$| $$      | $$  | $$| $$  \\ $$
    |  $$$$$$/|  $$$$$$/| $$  | $$|  $$$$$$/| $$  | $$| $$$$$$$$| $$$$$$$/| $$$$$$$$|  $$$$$$/| $$  | $$
    \\____ $$$ \\______/ |__/  |__/ \\______/ |__/  |__/|________/|_______/ |________/ \\______/ |__/  |__/
         \\__/
                </div>
            </div>
        </p>
                    `;
                    LigneSuivante();
                }else if (valeur === "./jeu"){
                    fenetre.innerHTML += `
                    <div class="output-line info"><br>[ <span class="cyan">INFO</span> ] Chargement du jeu ...</div>
                    `;
                    window.location.href = '../page/jeu.html';
                    fenetre.innerHTML += `
                    <div class="output-line info">[ <span class="cyan">INFO</span> ] Jeu lancé</div>
                    `;
                    LigneSuivante();
                }else{

                    ligneActuelle.innerHTML = `<br><span class="prompt">PS C:\\Users\\Noah&gt; <span class="error">${valeur}</span></span>`;
                    ligneActuelle.id = "";

                    fenetre.innerHTML += `
                    <div class="output-line info">[ <span class="error">ERREUR</span> ] Le terme « <span class="error">${valeur}</span> » n'est pas reconnu comme nom de commande.</div>
                    <div class="output-line info">[ <span class="warning">ATTENTION</span> ]  Vérifiez l'orthographe du nom et réessayez.</div>
                    `;

                    LigneSuivante();

                }
            }
        }
    }
}

function accueil() {
    const content = `
        <section class="body-accueil" id="body-accueil">
            <div class="terminal">
    <div class="terminal-header">
    <img src="../img/terminal.svg" class="terminal-icon">
    <span class="terminal-title">Terminal</span>
    <span class="terminal-close" onclick="closeTerminal()">✕</span>
    </div>
    <div class="terminal-body" id="terminal-output">
    <div class="output-line info">PS C:\\Users\\Noah&gt; <span class="success">./moi</span></div>
            <div class="ascii-container">
                <div class="ascii-art">
     /$$   /$$  /$$$$$$   /$$$$$$  /$$   /$$
    | $$$ | $$ /$$__  $$ /$$__  $$| $$  | $$
    | $$$$| $$| $$  \\ $$| $$  \\ $$| $$  | $$
    | $$ $$ $$| $$  | $$| $$$$$$$$| $$$$$$$$      
    | $$  $$$$| $$  | $$| $$__  $$| $$__  $$      
    | $$\\  $$$| $$  | $$| $$  | $$| $$  | $$      
    | $$ \\  $$|  $$$$$$/| $$  | $$| $$  | $$      
    |__/  \\__/ \\______/ |__/  |__/|__/  |__/       
                                      
                </div>
            </div>
        <p class="terminal-line">
            <div class="ascii-container">
                <div class="ascii-art">
      /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$$ /$$$$$$$  /$$$$$$$$ /$$   /$$ /$$$$$$$
     /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$| $$  | $$| $$_____/| $$__  $$| $$_____/| $$  | $$| $$__  $$
    | $$  \\ $$| $$  | $$| $$  \\ $$| $$  \\__/| $$  | $$| $$      | $$  \\ $$| $$      | $$  | $$| $$  \\ $$
    | $$  | $$| $$  | $$| $$$$$$$$| $$ /$$$$| $$$$$$$$| $$$$$   | $$$$$$$ | $$$$$   | $$  | $$| $$$$$$$/
    | $$  | $$| $$  | $$| $$__  $$| $$|_  $$| $$__  $$| $$__/   | $$__  $$| $$__/   | $$  | $$| $$__  $$
    | $$/$$ $$| $$  | $$| $$  | $$| $$  \\ $$| $$  | $$| $$      | $$  \\ $$| $$      | $$  | $$| $$  \\ $$
    |  $$$$$$/|  $$$$$$/| $$  | $$|  $$$$$$/| $$  | $$| $$$$$$$$| $$$$$$$/| $$$$$$$$|  $$$$$$/| $$  | $$
    \\____ $$$ \\______/ |__/  |__/ \\______/ |__/  |__/|________/|_______/ |________/ \\______/ |__/  |__/
         \\__/
                </div>
            </div>
        </p>
            <div class="output-line" style="margin-top: 15px;">[ <span style="color:darkcyan">INFO</span> ] Tapez <span class="success">help</span> pour voir les commandes disponibles.</div>
            <div class="output-line" id="output-line"><br><span class="prompt">PS C:\\Users\\Noah&gt;</span><input type="text" id="terminal-input" autofocus autocomplete="off"></div>
        </div>
    </div>
            <div class="boiteCentre">
                <div class="navTitre">   
                     <div class="titre1" >
                        <h1>Développeur</h1>
                    </div>
                     <div class="titre2" >
                        <h1>Web</h1>
                        <span class="cursor">_</span>
                    </div>
                    <div class="boutonDirec">
                        <div class="boiteDirec">
                            <button class="boutonTitre"><i>Qui suis-je ?</i></button>
                            <button class="boutonArrow" onclick="scrollToSection('body-profil')"><img src="../img/arrow-down.svg"></button>
                            <h2 class="st"> \\...</h2>
                        </div>
                    </div>
                    <div class="boutonDirec">
                        <div class="boiteDirec2">
                            <h2 class="st">.../ </h2>
                            <button class="boutonTitre"><i>Contactez moi</i></button>
                            <button class="boutonArrow" onclick="scrollToSection('body-contact')"><img src="../img/arrow-down.svg"><img src="../img/arrow-down.svg"></button>
                        </div>
                    </div>
                </div>
            </div>  
        </section>    
        <section id="body-profil">
            <div class="corpProfil">
                <div class="profile"></div>
                <div class="bio">
                    <h2>A propos de moi :</h2>
                    <p>iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs<br>
                    iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs<br>
                    iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs<br>
                    iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs<br>
                    iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs<br>
                    iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs<br></p>
                </div>
                <div class="Boutoncontact">
                    <h2 class="st">.../ </h2>
                    <button class="boutonTitre"><i>Contactez moi</i></button>
                    <button class="boutonArrow" onclick="scrollToSection('body-contact')"><img src="../img/arrow-down.svg"></button>
                    <h2 class="st"> \\...</h2>
                </div>
                <div class="actu">
                    <h2>Actuellement :</h2>
                    <p>Étudiant en première années de BUT informatique à l'Université Caen Normandie</p>
                </div>
            </div>
        </section>
        <section id="body-contact">
            <div id="corpContact">
                <form class="contactMoi">
                    <h2 class="titreForme">Contactez-moi</h2>
                    <div class="input1">
                        <label>Nom *</label>
                        <br>
                        <input type="text" id="nomContact" required>
                    </div>
                    <div class="input2">
                        <label>Prénom</label>
                        <br>
                        <input type="text" id="prenomContact">
                    </div>
                    <div class="input3">
                        <label>E-Mail *</label>
                        <br>
                        <input type="email" id="emailContact" required>
                    </div>    
                    <div class="input4">   
                        <label>Téléphone</label>
                        <br>
                        <input type="tel" id="telContact">
                    </div> 
                    <div class="input5">
                        <label>Objet *</label>
                        <br>
                        <input type="text" id="objetContact" required>
                    </div>    
                    <div class="input6"> 
                        <label>Message *</label>
                        <br>
                        <textarea id="messageContact" content="Votre message" required></textarea>
                    </div>     
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="checkDefault" required>
                        <label class="form-check-label" for="checkDefault" style="font-size: 10px">
                            En soumettant ce formulaire, j'accepte que mes données personnelles soient utilisées pour me recontacter. Aucun autre traitement ne sera effectué avec mes informations. Pour connaître et exercer vos droits, veuillez consultez la Politique de confidentialité.
                        </label>
                    </div>    
                    <div class="envoyer">
                        <button class="boutonEnvoyer" type="submit">Envoyez</button>
                    </div>                
                </form>
                <div class="monContact">
                    <h2>Mon contact</h2>
                </div>
            </div>
        </section>
    `;
    setTimeout(() => {
        const input = document.getElementById('terminal-input');
        if (input) {
            input.addEventListener('keydown', validerSaisie);
            input.focus(); // On met le focus automatiquement
        }
    }, 600); // Délai correspondant à ta transition

    changeContent('accueil', content);
}

function parcours() {
    const content = `
        <div class="body-accueil-2">
            <h2>Mon parcours</h2>
            <p>Contenu du profil...</p>
        </div>
    `;

    changeContent('accueil', content);
}

function projet() {
    const content = `
        <div class="body-accueil-2">
            <h2>Mes projets</h2>
            <p>Contenu du profil...</p>
        </div>
    `;

    changeContent('accueil', content);
}

function comptence() {
    const content = `
        <div class="body-accueil-2">
            <h2>Mes competence</h2>
            <p>Contenu du profil...</p>
        </div>
    `;

    changeContent('accueil', content);
}

function experience() {
    const content = `
        <div class="body-accueil-2">
            <h2>Mon experience</h2>
            <p>Contenu du profil...</p>
        </div>
    `;

    changeContent('accueil', content);
}



function GoConnexion() {
    window.location.href = '../page/connexion.html';
}

function activeDiv() {
    const toutesLesDivs = document.querySelectorAll('*');

    toutesLesDivs.forEach(div => {

        div.style.border = '1px solid red';
        div.style.boxSizing = 'border-box';
    });
}

function desactiveDiv() {
    const toutesLesDivs = document.querySelectorAll('*');

    toutesLesDivs.forEach(div => {
        div.style.border = '';
    });
}

function toggleDivBorders() {
    const premiereDiv = document.querySelector('*');

    const estActive = premiereDiv && premiereDiv.style.border.includes('red');

    if (estActive) {
        desactiveDiv();
    } else {
        activeDiv();
    }
}

document.addEventListener('DOMContentLoaded',  () => {
    navigation();
    accueil();
});

const commands = {
    help: {
        description: "Affiche la liste des commandes disponibles",
        action: () => {
            return `<span class="success">Commandes disponibles :</span>
  <span class="warning">help</span>      - Affiche cette aide
  <span class="warning">about</span>     - À propos de moi
  <span class="warning">skills</span>    - Mes compétences
  <span class="warning">contact</span>   - Informations de contact
  <span class="warning">clear</span>     - Efface le terminal
  <span class="warning">echo</span>      - Affiche un message
  <span class="warning">date</span>      - Affiche la date et l'heure`;
        }
    },

    about: {
        description: "Informations à propos de Noah",
        action: () => {
            return `<span class="info">Noah Ouahmane</span>
Développeur Web, Application et gestion de base de données
Passionné par le développement et les nouvelles technologies.`;
        }
    },

    skills: {
        description: "Liste des compétences",
        action: () => {
            return `<span class="success">Compétences :</span>
  • Développement Web (HTML, CSS, JavaScript)
  • Développement d'applications
  • Gestion de bases de données
  • Et bien plus encore...`;
        }
    },

    contact: {
        description: "Affiche les informations de contact",
        action: () => {
            return `<span class="info">Contact :</span>
  Email : noah.ouahmane@example.com
  GitHub : github.com/noahO
  LinkedIn : linkedin.com/in/noahO`;
        }
    },

    clear: {
        description: "Efface l'écran du terminal",
        action: () => {
            output.innerHTML = '';
            return null;
        }
    },

    echo: {
        description: "Affiche un message",
        action: (args) => {
            return args.join(' ') || '';
        }
    },

    date: {
        description: "Affiche la date et l'heure actuelles",
        action: () => {
            return new Date().toLocaleString('fr-FR');
        }
    }

    // AJOUTEZ VOS PROPRES COMMANDES ICI
    // Exemple :
    // macommande: {
    //     description: "Description de ma commande",
    //     action: (args) => {
    //         // Votre code ici
    //         return "Résultat de la commande";
    //     }
    // }
};

function handleInput(e) {
    if (e.key === 'Enter') {
        const input = e.target;
        const command = input.value.trim();

        // Désactiver l'input pour éviter les doubles soumissions
        input.removeEventListener('keydown', handleInput);
        input.disabled = true;

        if (command) {
            commandHistory.unshift(command);
            historyIndex = -1;
            executeCommand(command);
        }

        addPromptLine();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            e.target.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            e.target.value = commandHistory[historyIndex];
        } else if (historyIndex === 0) {
            historyIndex = -1;
            e.target.value = '';
        }
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header'); // Remplacez par .titre si c'est lui le header

    // On crée un élément invisible juste au dessus du header
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    header.parentNode.insertBefore(sentinel, header);

    const observer = new IntersectionObserver((entries) => {
        // Si le sentinel n'est plus visible, ça veut dire que le header est collé au top
        header.classList.toggle('is-pinned', !entries[0].isIntersecting);
    }, {
        threshold: [0]
    });

    observer.observe(sentinel);
});

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

