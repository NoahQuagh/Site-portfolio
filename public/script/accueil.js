const API_MENU_URL = 'http://localhost:3000/api/v1/menus';


function navigation() {
    const navPills = document.getElementById('customNav');
    if (!navPills) return;

    const indicator = navPills.querySelector('.indicator');
    const navItems = navPills.querySelectorAll('.nav-item');
    const navLinks = navPills.querySelectorAll('.nav-link');


    const PADDING_VERTICAL = 10;
    const PADDING_HORIZONTAL_START = 20;

    function updateIndicator(activeLink) {
        if (!activeLink) {
            activeLink = navPills.querySelector('.nav-link.active');
        }

        if (activeLink) {
            const activeItem = activeLink.closest('.nav-item');
            if (!activeItem) return;


            const itemRect = activeItem.getBoundingClientRect();
            const navRect = navPills.getBoundingClientRect();


            const navHeight = navPills.offsetHeight;
            const indicatorHeight = navHeight - (2 * PADDING_VERTICAL);


            const width = activeItem.offsetWidth;


            const leftOffset = itemRect.left - navRect.left - PADDING_HORIZONTAL_START;


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


    setTimeout(() => {
        updateIndicator();
    }, 50);


    window.addEventListener('resize', () => updateIndicator());
}



function changeContent(elementId, newContent, duration = 500) {
        const element = document.getElementById(elementId);

        if (!element) {
            console.error(`Élément #${elementId} non trouvé`);
            return;
        }


        element.classList.add('transitioning');


        setTimeout(() => {

            element.innerHTML = newContent;

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


function validerSaisie(event)
{
    if (event.key === "Enter") {
        const valeur = event.target.value.toLowerCase().trim();
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
                    <div class="output-line info" style="color:#5dd62c">   help</div>
                    <div class="output-line info" style="color:#5dd62c">   cd parcours</div>
                    <div class="output-line info" style="color:#5dd62c">   cd projets</div>
                    <div class="output-line info" style="color:#5dd62c">   cd competences</div>
                    <div class="output-line info" style="color:#5dd62c">   cd expériences</div>
                    <div class="output-line info" style="color:#5dd62c">   cd connexion</div>
                    <div class="output-line info" style="color:#5dd62c">   ./bio</div>
                    <div class="output-line info" style="color:#5dd62c">   ./moi</div>
                    <div class="output-line info" style="color:#5dd62c">   ./jeu</div>
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
            <div class="Titre">   
                 <div class="titre1" >
                    <h1>Développeur</h1>
                 </div>
                 <div class="titre2" >
                    <h1>Web</h1>
                    <span class="cursor">_</span>
                </div>
            </div>    
            
            <div class="boutonDirec">
                <div class="boiteDirec">
                        <p class="boutonTitre"><i>Qui suis-je ?</i></p>
                        <button class="boutonArrow" onclick="scrollToSection('body-profil')"><img src="../img/arrow-down.svg"></button>
                </div>
                <div class="boiteDirec2">
                    <div>
                        <p class="boutonTitre"><i>Contactez moi</i></p>
                        <button class="boutonArrow" onclick="scrollToSection('body-contact')"><img src="../img/arrow-down.svg"><img src="../img/arrow-down.svg"></button>
                    </div>
                </div>
            </div>
        </section>    
        <section id="body-profil">
            <div class="corpProfil">
                <div class="profile">
                    <div class="profile-column">
                        <div class="profile-card">
                            <div class="profile-image-container">
                                <img src="../img/photoMoi.png" alt="Noah Quaghebeur" class="profile-image">
                            </div>

                            <h2 class="profile-name">NOAH QUAGHEBEUR</h2>
                            <p class="profile-title">Développeur Web</p>

                            <div class="profile-stats">
                                <div class="stat-item">
                                    <span class="stat-label">Localisation</span>
                                    <span class="stat-value">6 rue Anton Tchekhov, Ifs</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">E-mail</span>
                                    <span class="stat-value">noah.quaghebeur@laposte.net</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Téléphone</span>
                                    <span class="stat-value">07 67 86 47 57</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Status</span>
                                    <span class="stat-value">Etudiant</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bio">
                    <h2><span class="success">A PROPOS DE MOI_</span></h2>
                    <p>iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs
                    iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs
                    iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs
                    iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs
                    iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs
                    iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfshviyshivhs</p>
                </div>
                <div class="actu">
                    <h2><span class="success">ACTUELLEMENT_</span></h2>
                    <p>Étudiant en première années de BUT informatique à l'Université Caen Normandie</p>
                </div>
            </div>
        </section>
        <section id="body-contact">
            <div id="corpContact">
                <div class="boiteTitre"><h2 class="titreForme">.../ Contactez-moi \\...</h2></div>
                <form class="contactMoi">
                    <div class="input1">
                        <label><b>Nom *</b></label>
                        <br>
                        <input type="text" id="nomContact" required>
                    </div>
                    <div class="input2">
                        <label><b>Prénom</b></label>
                        <br>
                        <input type="text" id="prenomContact">
                    </div>
                    <div class="input3">
                        <label><b>E-Mail *</b></label>
                        <br>
                        <input type="email" id="emailContact" required>
                    </div>    
                    <div class="input4">   
                        <label><b>Téléphone</b></label>
                        <br>
                        <input type="tel" id="telContact">
                    </div> 
                    <div class="input5">
                        <label><b>Objet *</b></label>
                        <br>
                        <input type="text" id="objetContact" required>
                    </div>    
                    <div class="input6"> 
                        <label><b>Message *</b></label>
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
            </div>
        </section>
    `;
    setTimeout(() => {
        const input = document.getElementById('terminal-input');
        if (input) {
            input.addEventListener('keydown', validerSaisie);
            input.focus();
        }
    }, 600);

    changeContent('accueil', content);
}

function parcours() {
    const content = `
        <section id="parcours">
            <div class="BoiteTitre">
                <h1>Mon Parcours</h1>
            </div>
            <div class="container">
                <div class="timeline" id="timeline">
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <span class="timeline-date">2023-2024</span>
                            <h3 class="timeline-title">Lycée - Première</h3>
                            <p class="timeline-description">Première étape de mon parcours avec une formation en développement web et découverte des technologies modernes.</p>
                        </div>
                    </div>
            
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <span class="timeline-date">2024-2025</span>
                            <h3 class="timeline-title">Lycée - Terminale</h3>
                            <p class="timeline-description">Réalisation de mon premier projet professionnel complet, application web avec React et Node.js.</p>
                        </div>
                    </div>
            
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <span class="timeline-date">2025-2026</span>
                            <h3 class="timeline-title">BUT Informatique - 1<sup>ère</sup> année</h3>
                            <p class="timeline-description">Obtention de certifications en développement full-stack et spécialisation en JavaScript avancé.</p>
                        </div>
                    </div>
            
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <span class="timeline-date">2026-2027</span>
                            <h3 class="timeline-title">BUT Informatique - 2<sup>ème</sup> année</h3>
                            <p class="timeline-description">Obtention de certifications en développement full-stack et spécialisation en JavaScript avancé.</p>
                        </div>
                    </div>
                    
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <span class="timeline-date">2027-2028</span>
                            <h3 class="timeline-title">BUT Informatique - 3<sup>ème</sup> année</h3>
                            <p class="timeline-description">Obtention de certifications en développement full-stack et spécialisation en JavaScript avancé.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="selection"></div>
        </section>
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


document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');


    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    header.parentNode.insertBefore(sentinel, header);

    const observer = new IntersectionObserver((entries) => {

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

//GESTION TIMELINE

const timelineItems = document.querySelectorAll('.timeline-item');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

timelineItems.forEach(item => {
    observer.observe(item);
});

document.querySelectorAll('.timeline-content').forEach(content => {
    content.addEventListener('click', function() {
        this.style.background = this.style.background === 'rgb(246, 246, 246)' ? 'white' : '#f6f6f6';
    });
});