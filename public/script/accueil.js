const API_MENU_URL = 'http://localhost:3000/api/v1/menus';

/* ─────────────────────────────────────────
   NAVIGATION — sliding indicator
───────────────────────────────────────── */
function navigation() {
    const navPills = document.getElementById('customNav');
    if (!navPills) return;

    const indicator = navPills.querySelector('.indicator');
    const navLinks = navPills.querySelectorAll('.nav-link');

    function updateIndicator(activeLink) {
        if (!activeLink) activeLink = navPills.querySelector('.nav-link.active');
        if (!activeLink) {
            indicator.style.opacity = '0';
            return;
        }

        const activeItem = activeLink.closest('.nav-item');
        if (!activeItem) return;

        const itemRect = activeItem.getBoundingClientRect();
        const navRect = navPills.getBoundingClientRect();

        indicator.style.width = `${activeItem.offsetWidth}px`;
        indicator.style.height = `${activeItem.offsetHeight - 10}px`;
        indicator.style.transform = `translateY(-50%) translateX(${itemRect.left - navRect.left}px)`;
        indicator.style.opacity = '1';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            updateIndicator(this);
        });
    });

    setTimeout(() => updateIndicator(), 50);
    window.addEventListener('resize', () => updateIndicator());
}

/* ─────────────────────────────────────────
   TRANSITION DE CONTENU
───────────────────────────────────────── */
function changeContent(elementId, newContent, duration = 300) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Phase 1 : fondu sortant
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    element.style.opacity = '0';
    element.style.transform = 'translateY(12px)';

    setTimeout(() => {
        // Injecter le nouveau contenu
        element.innerHTML = newContent;

        // Forcer un reflow pour que le navigateur prenne en compte opacity:0 avant d'animer
        void element.offsetHeight;

        // Phase 2 : fondu entrant
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, duration);
}

/* ─────────────────────────────────────────
   TERMINAL — ligne suivante
───────────────────────────────────────── */
function LigneSuivante() {
    const fenetre = document.getElementById('terminal-output');
    if (!fenetre) return;
    fenetre.innerHTML += `
        <div class="output-line" id="output-line">
            <br><span class="prompt">PS C:\\Users\\Noah&gt;</span>
            <input type="text" id="terminal-input" autofocus autocomplete="off">
        </div>`;
    fenetre.scrollTop = fenetre.scrollHeight;
    const input = document.getElementById('terminal-input');
    if (input) {
        input.addEventListener('keydown', validerSaisie);
        input.focus();
    }
}

/* ─────────────────────────────────────────
   TERMINAL — validation commande
───────────────────────────────────────── */
function validerSaisie(event) {
    if (event.key !== 'Enter') return;
    const valeur = event.target.value.toLowerCase().trim();
    const fenetre = document.getElementById('terminal-output');
    const ligneActuelle = document.getElementById('output-line');
    if (!valeur) return;

    const cmdsNav = {
        'cd parcours': {fn: parcours, name: 'parcours'},
        'cd projets': {fn: projet, name: 'projet'},
        'cd competences': {fn: comptence, name: 'competence'},
        'cd expériences': {fn: experience, name: 'experience'},
        'cd connexion': {fn: GoConnexion, name: null},
    };

    ligneActuelle.innerHTML = `<br><span class="prompt">PS C:\\Users\\Noah&gt; <span class="${cmdsNav[valeur] || valeur === 'help' || valeur === './bio' || valeur === './moi' || valeur === './jeu' ? 'success' : 'error'}">${valeur}</span></span>`;
    ligneActuelle.id = '';

    if (cmdsNav[valeur]) {
        cmdsNav[valeur].fn();
        if (cmdsNav[valeur].name) {
            document.querySelectorAll('.nav-link').forEach(l => {
                l.classList.remove('active');
                if (l.getAttribute('data-name') === cmdsNav[valeur].name) l.classList.add('active');
            });
            setTimeout(() => navigation(), 100);
        }
        LigneSuivante();

    } else if (valeur === 'help') {
        fenetre.innerHTML += `
            <div class="output-line info"><br>COMMANDES DISPONIBLES</div>
            ${['help', 'cd parcours', 'cd projets', 'cd competences', 'cd expériences', 'cd connexion', './bio', './moi', './jeu']
            .map(c => `<div class="output-line" style="color:#5dd62c">   ${c}</div>`).join('')}`;
        LigneSuivante();

    } else if (valeur === './bio') {
        fenetre.innerHTML += `
            <div class="output-line info"><br>[ <span class="cyan">BIO</span> ] Étudiant en BUT Informatique, passionné de développement web.</div>`;
        LigneSuivante();

    } else if (valeur === './moi') {
        fenetre.innerHTML += asciiNoah();
        LigneSuivante();

    } else if (valeur === './jeu') {
        fenetre.innerHTML += `
            <div class="output-line info"><br>[ <span class="cyan">INFO</span> ] Chargement du jeu ...</div>`;
        window.location.href = '../page/jeu.html';
        LigneSuivante();

    } else {
        ligneActuelle.innerHTML = `<br><span class="prompt">PS C:\\Users\\Noah&gt; <span class="error">${valeur}</span></span>`;
        ligneActuelle.id = '';
        fenetre.innerHTML += `
            <div class="output-line info">[ <span class="error">ERREUR</span> ] « <span class="error">${valeur}</span> » n'est pas reconnu.</div>
            <div class="output-line info">[ <span class="warning">AIDE</span> ] Tapez <span class="success">help</span> pour la liste des commandes.</div>`;
        LigneSuivante();
    }
}

function asciiNoah() {
    return `
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
        </div>`;
}

/* ─────────────────────────────────────────
   PAGE — ACCUEIL
───────────────────────────────────────── */
function accueil() {
    const content = `
        <!-- HERO -->
        <section id="NomAccueil">
            <div class="hero-accueil">
                <div class="hero-kicker">Portfolio — Noah Quaghebeur</div>
                <h1 class="hero-name">Noah<br><em>Quaghebeur</em></h1>
            </div>
    
            <!-- TERMINAL -->
            <div class="terminal-wrap">
                <div class="terminal">
                    <div class="terminal-header">
                        <img src="../img/terminal.svg" class="terminal-icon">
                        <span class="terminal-title">Terminal — PS C:\\Users\\Noah</span>
                        <span class="terminal-close" onclick="closeTerminal()">✕</span>
                    </div>
                    <div class="terminal-body" id="terminal-output">
                        <div class="output-line info">PS C:\\Users\\Noah&gt; <span class="success">./moi</span></div>
                        ${asciiNoah()}
                        <div class="output-line" style="margin-top:12px;">
                            [ <span style="color:darkcyan">INFO</span>] Tapez <span class="success">help</span> pour voir les commandes disponibles.
                        </div>
                        <div class="output-line" id="output-line">
                            <br><span class="prompt">PS C:\\Users\\Noah&gt;</span>
                            <input type="text" id="terminal-input" autofocus autocomplete="off">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- PROFIL -->
        <div class="section-wrap">
            <div class="chapter" id="body-profil">
                <div class="chapter-header">
                    <h2 class="chapter-title">Qui suis-je ?</h2>
                </div>
                <div class="profil-grid">
                    <div class="profile-card">
                        <div class="profile-image-container">
                            <img src="../img/photoMoi.png" alt="Noah Quaghebeur" class="profile-image">
                        </div>
                        <div class="profile-name">NOAH QUAGHEBEUR</div>
                        <div class="profile-title-badge">Étudiant</div>
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
                                <span class="stat-label">Statut</span>
                                <span class="stat-value">Étudiant en BUT Informatique</span>
                            </div>
                        </div>
                    </div>
                    <div class="profil-right">
                        <div class="bio-block">
                            <div class="block-label">Biographie</div>
                            <div class="block-title">À PROPOS DE MOI_</div>
                            <p>iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs
                            iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs
                            iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfsyshviyshivhs
                            iqsebfiysbefiyvsbiyvbsiyvhbisfesfdsfxcsfesdfshviyshivhs</p>
                        </div>
                        <div class="actu-block">
                            <div class="block-label">Actuellement</div>
                            <div class="block-title">ACTUELLEMENT_</div>
                            <p>Étudiant en première année de BUT Informatique à l'Université Caen Normandie.</p>
                        </div>
                        <div class="nav-arrows">
                            <button class="arrow-btn" onclick="scrollToSection('body-contact')">
                                Contactez-moi ↓
                            </button>
                            <button class="arrow-btn" onclick="parcours()">
                                <img src="../img/arrow-down.svg"> Mon parcours
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CONTACT -->
            <div class="chapter" id="body-contact" style="border-bottom:none; padding-bottom:4rem;">
                <div class="chapter-header">
                    <h2 class="chapter-title">Contactez-moi</h2>
                </div>
                <form class="contact-grid" onsubmit="return false;">
                    <div class="form-field">
                        <label>Nom *</label>
                        <input type="text" id="nomContact" required>
                    </div>
                    <div class="form-field">
                        <label>Prénom</label>
                        <input type="text" id="prenomContact">
                    </div>
                    <div class="form-field">
                        <label>E-Mail *</label>
                        <input type="email" id="emailContact" required>
                    </div>
                    <div class="form-field">
                        <label>Téléphone</label>
                        <input type="tel" id="telContact">
                    </div>
                    <div class="form-field field-full">
                        <label>Objet *</label>
                        <input type="text" id="objetContact" required>
                    </div>
                    <div class="form-field field-full">
                        <label>Message *</label>
                        <textarea id="messageContact" required></textarea>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" id="checkDefault" required>
                        <label for="checkDefault">En soumettant ce formulaire, j'accepte que mes données personnelles soient utilisées pour me recontacter. Aucun autre traitement ne sera effectué avec mes informations.</label>
                    </div>
                    <div style="grid-column:1/-1;">
                        <button class="btn-submit" type="submit">Envoyer →</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    changeContent('accueil', content);

    setTimeout(() => {
        const input = document.getElementById('terminal-input');
        if (input) {
            input.addEventListener('keydown', validerSaisie);
            input.focus();
        }
    }, 350);
}

/* ─────────────────────────────────────────
   PAGE — PARCOURS
───────────────────────────────────────── */
function parcours() {
    const etapes = [
        {
            date: '2023 – 2024',
            titre: 'Lycée — Première',
            desc: 'Première étape de mon parcours avec une formation en développement web et découverte des technologies modernes.'
        },
        {
            date: '2024 – 2025',
            titre: 'Lycée — Terminale',
            desc: 'Réalisation de mon premier projet professionnel complet, application web avec React et Node.js.'
        },
        {
            date: '2025 – 2026',
            titre: 'BUT Informatique — 1ère année',
            desc: 'Étudiant à l\'IUT de Caen, spécialité développement web. Découverte de l\'architecture réseau, des bases de données et du développement applicatif.'
        },
        {
            date: '2026 – 2027',
            titre: 'BUT Informatique — 2ème année',
            desc: 'Approfondissement full-stack et premières expériences en entreprise.'
        },
        {
            date: '2027 – 2028',
            titre: 'BUT Informatique — 3ème année',
            desc: 'Stage longue durée et spécialisation en développement web avancé.'
        },
    ];

    const items = etapes.map((e, i) => `
        <div class="timeline-item" style="transition-delay:${i * 80}ms;">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="timeline-date">${e.date}</span>
                <h3 class="timeline-title">${e.titre}</h3>
                <p class="timeline-description">${e.desc}</p>
            </div>
        </div>`).join('');

    const content = `
        <div class="section-wrap">
            <div class="chapter" style="border-bottom:none; padding-bottom:4rem;">
                <div class="chapter-header">
                    <span class="chapter-num">parcours</span>
                    <h2 class="chapter-title">Mon Parcours</h2>
                </div>
                <div class="timeline" id="timeline">${items}</div>
            </div>
        </div>`;

    changeContent('accueil', content);

    setTimeout(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('show');
            });
        }, {threshold: 0.15});
        document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
    }, 300);
}

/* ─────────────────────────────────────────
   PAGES PLACEHOLDER
───────────────────────────────────────── */
function _placeholderPage(num, label, title) {
    changeContent('accueil', `
        <div class="section-wrap">
            <div class="chapter" style="border-bottom:none; padding-bottom:4rem;">
                <div class="chapter-header">
                    <span class="chapter-num">${num}</span>
                    <h2 class="chapter-title">${title}</h2>
                </div>
                <div class="placeholder-block">
                    <div class="ph-label">En construction</div>
                    <h2>${label}_</h2>
                </div>
            </div>
        </div>`);
}

function projet() {
    _placeholderPage('projets', 'Mes Projets', 'Mes Projets');
}

function comptence() {
    _placeholderPage('compétences', 'Mes Compétences', 'Mes Compétences');
}

function experience() {
    _placeholderPage('expériences', 'Mes Expériences', 'Mes Expériences');
}

/* ─────────────────────────────────────────
   UTILITAIRES
───────────────────────────────────────── */
function GoConnexion() {
    window.location.href = '../page/connexion.html';
}

function closeTerminal() {
    const t = document.querySelector('.terminal');
    if (t) t.style.display = 'none';
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
}

function activeDiv() {
    document.querySelectorAll('*').forEach(el => {
        el.style.border = '1px solid red';
        el.style.boxSizing = 'border-box';
    });
}

function desactiveDiv() {
    document.querySelectorAll('*').forEach(el => el.style.border = '');
}

function toggleDivBorders() {
    const first = document.querySelector('*');
    (first && first.style.border.includes('red')) ? desactiveDiv() : activeDiv();
}

/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    navigation();
    accueil();

    // header sticky shadow
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:100%;';
    document.body.prepend(sentinel);
    new IntersectionObserver(entries => {
        document.querySelector('header').classList.toggle('is-pinned', !entries[0].isIntersecting);
    }).observe(sentinel);
});
