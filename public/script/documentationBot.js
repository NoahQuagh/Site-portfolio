/* ═══════════════════════════════════════════
   DONNÉES — Toutes les commandes du bot
═══════════════════════════════════════════ */
const commande = [
    {
        categorie: '/premier — Mode Premier Valorant',
        ancre: 'premier',
        cmds: [
            {
                nom: '/premier event',
                description: 'Créer un événement de game Premier et envoie les invitations automatiquement aux membres de l\'équipe.',
                acces: [
                    {
                        type: 'CAPITAINE'
                    },
                    {
                        type: 'ADJOINT'
                    }],
                admin: false,
                syntaxe: '/premier event &lt;jj&gt; &lt;mm&gt; &lt;aaaa&gt; &lt;hh&gt; &lt;mm&gt;',
                arguments: [
                    {nomArg: 'jour', type: 'requis', precision: 'Jour du match (format jj)'},
                    {nomArg: 'mois', type: 'requis', precision: 'Mois du match (format mm)'},
                    {nomArg: 'année', type: 'requis', precision: 'Année du match (format aaaa)'},
                    {nomArg: 'heure', type: 'requis', precision: 'Heure du match (format hh)'},
                    {nomArg: 'minute', type: 'requis', precision: 'Minute du match (format mm)'},
                ],
                action: 'Envoie une invitation en message privé sur Discord à tous les membres de votre équipe, avec des boutons Participer / Refuser. Un rappel est automatiquement créé après validation de la participation. Ce rappel est envoyé 30 min avant le match.'
            },
            {
                nom: '/premier créerTeam',
                description: 'Créer sa team Premier et en devenir capitaine',
                acces: [
                    {
                        type: 'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/premier créerTeam nom:&lt;nomEquipe&gt;',
                arguments: [
                    {nomArg: 'nom', type: 'requis', precision: 'Nom unique de l\'équipe Premier'},
                ],
                action: 'Vous devenez automatiquement capitaine. Un seul joueur peut être capitaine. Le nom d\'équipe doit être unique.'
            },
            {
                nom: '/premier inviteJoueur',
                description: 'Inviter jusqu\'à 6 joueurs dans sa team',
                acces: [
                    {
                        type: 'CAPITAINE'
                    }],
                admin: false,
                syntaxe: '/premier inviteJoueur joueur1:@user [joueur2..6]',
                arguments: [
                    {nomArg: 'joueur_1', type: 'requis', precision: 'Premier joueur à inviter (mention)'},
                    {
                        nomArg: 'joueur_2–6',
                        type: 'optionnel',
                        precision: 'Joueurs supplémentaires (jusqu\'à 6 au total)'
                    },
                ],
                action: 'Chaque joueur reçoit une invitation en DM. Réservé au capitaine. Maximum 7 joueurs par équipe.'
            },
            {
                nom: '/premier supTeam',
                description: 'Dissoudre son équipe Premier',
                acces: [
                    {
                        type: 'CAPITAINE'
                    }],
                admin: false,
                syntaxe: '/premier supTeam',
                arguments: [
                    {nomArg: 'aucune option', type: 'sans option', precision: 'Commande sans paramètres'},
                ],
                action: 'Supprime définitivement l\'équipe. Le nom et les joueurs sont libérés. Réservé au capitaine.'
            },
            {
                nom: '/premier supJoueur',
                description: 'Exclure un joueur de l\'équipe',
                acces: [
                    {
                        type: 'CAPITAINE'
                    }],
                admin: false,
                syntaxe: '/premier supJoueur joueur:@user',
                arguments: [
                    {nomArg: 'joueur', type: 'requis', precision: 'Joueur à exclure (mention)'},
                ],
                action: 'Réservé au capitaine. Le joueur est retiré de l\'équipe immédiatement.'
            },
            {
                nom: '/premier cancelEvent',
                description: 'Annuler un événement de game planifié',
                acces: [
                    {
                        type: 'CAPITAINE'
                    },
                    {
                        type: 'ADJOINT'
                    }],
                admin: false,
                syntaxe: '/premier cancelEvent jour:&lt;jj&gt; mois:&lt;mm&gt; année:&lt;aaaa&gt; heure:&lt;hh&gt; minute:&lt;mm&gt;',
                arguments: [
                    {nomArg: 'jour/mois/année', type: 'requis', precision: 'Date de l\'événement à annuler'},
                    {nomArg: 'heure/minute', type: 'requis', precision: 'Heure de l\'événement à annuler'},
                ],
                action: 'Supprime le rappel planifié. Les joueurs ne recevront plus de notification.'
            },
        ]
    },
    {
        categorie: '/valorant — Commandes relatives au jeu Valorant',
        ancre: 'valorant',
        cmds: [
            {
                nom: '/valorant rank',
                description: 'Obtenir le rang actuel d\'un joueur',
                acces: [
                    {
                        type: 'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/valorant rank pseudotag:&lt;Pseudo#Tag&gt;',
                arguments: [
                    {
                        nomArg: 'pseudotag',
                        type: 'requis',
                        precision: 'Pseudo et tag Valorant (ex: TenZ#NA1) — autocomplétion disponible'
                    },
                ],
                action: 'Astuce : l\'autocomplétion propose les pseudos déjà recherchés. Tapez quelques lettres pour filtrer.'
            },
            {
                nom: '/valorant stats',
                description: 'Obtenir les statistiques détaillées d\'un joueur',
                acces: [
                    {
                        type: 'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/valorant stats pseudotag:&lt;Pseudo#Tag&gt;',
                arguments: [
                    {
                        nomArg: 'pseudotag',
                        type: 'requis',
                        precision: 'Pseudo et tag Valorant (ex: Shroud#NA1) — autocomplétion disponible'
                    },
                ],
                action: 'A remplir'
            },
        ]
    },
    {
        categorie: '// Utilitaires',
        ancre: 'utilitaires',
        cmds: [
            {
                nom: '/bot',
                description: 'Affiche les informations sur le bot',
                acces: [
                    {
                        type: 'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/bot',
                arguments: [],
                action: 'Version, uptime, développeur et informations techniques du bot.'
            },
            {
                nom: '/help',
                description: 'Liste des commandes disponibles',
                acces: [
                    {
                        type: 'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/help [option:all]',
                arguments: [
                    {
                        nomArg: 'option',
                        type: 'optionnel',
                        precision: '<code>all</code> pour lister toutes les commandes'
                    },
                ],
                action: 'a remplir'
            },
            {
                nom: '/man',
                description: 'Manuel détaillé d\'une commande spécifique',
                acces: [
                    {
                        type: 'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/man commande:&lt;nomCommande&gt;',
                arguments: [
                    {nomArg: 'commande', type: 'requis', precision: 'Nom de la commande dont vous voulez le manuel'},
                ],
                action: 'a remplir'
            },
            {
                nom: '/nouveauté',
                description: 'Voir les nouveautés et mises à jour du bot',
                acces: [
                    {
                        type: 'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/nouveauté [version:&lt;x.x.x&gt;]',
                arguments: [
                    {
                        nomArg: 'version',
                        type: 'optionnel',
                        precision: 'Version spécifique (ex: 1.0.3). Sans argument : dernière version.'
                    },
                ],
                action: 'a remplir'
            },
            {
                nom: '/log',
                description: 'Récupérer le fichier de logs du bot',
                acces: [
                    {
                        type: 'ADMIN'
                    }],
                admin: true,
                syntaxe: '/log',
                arguments: [],
                action: 'Réservé au propriétaire du bot. Envoie le fichier <span class="inline-code">logs.txt</span> en pièce jointe dans le salon.'
            },
        ]
    },
];

/* ═══════════════════════════════════════════
   DONNÉES — Présentation
═══════════════════════════════════════════ */
const presentation = [
    {
        titre: 'Présentation Générale',
        content: 'Ce projet consiste en l\'élaboration d\'un bot Discord polyvalent conçu pour améliorer l\'expérience des utilisateurs au sein d\'une communauté compétitive et étudiante. Le bot automatise la gestion d\'événements sportifs (mode Premier de Valorant), assure le suivi des performances des joueurs et facilite l\'accès aux emplois du temps universitaires.',
    },
    {
        titre: 'Architecture Technique',
        content: 'Le bot est développé en Java en utilisant la bibliothèque Javacord pour l\'interaction avec l\'API Discord. Il repose sur une architecture asynchrone robuste utilisant des <span class="inline-code">CompletableFuture</span> pour garantir une fluidité d\'utilisation, même lors de requêtes API intensives.',
    },
    {
        titre: 'Objectifs du Projet',
        content: '<b>Automatisation</b> : Réduire la charge mentale des capitaines d\'équipe pour l\'organisation des matchs sur Discord.<br><b>Accessibilité</b> : Centraliser les informations utiles (sportives et scolaires) sur une plateforme unique (Discord).<br><b>Réactivité</b> : Offrir un système de notification instantané pour les événements importants.'
    },
    {
        titre: 'Commencez avec GigaBot !',
        content: 'Commencez par <span class="inline-code">/</span> puis Discord vous proposera la liste des commandes disponibles ou à lire la rubrique <em>Commande</em>.',
    },
];

/* ═══════════════════════════════════════════
   UTILITAIRES UI
═══════════════════════════════════════════ */
const badgeClass = {
    'ADMIN': 'badge-admin',
    'SLASH': 'badge-slash',
    'PUBLIC': 'badge-slash',
    'CAPITAINE': 'badge-capitaine',
    'ADJOINT': 'badge-adjoint',
};

function toggleCmd(card) {
    card.classList.toggle('open');
}

function toggleChangelog(header) {
    const body = header.nextElementSibling;
    body.style.display = body.style.display === 'none' ? 'block' : 'none';
}

/* ─────────────────────────────────────────
   TRANSITION — même système que l'accueil
───────────────────────────────────────── */
function changeContent(elementId, newContent, duration = 300) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    element.style.opacity = '0';
    element.style.transform = 'translateY(12px)';

    setTimeout(() => {
        element.innerHTML = newContent;
        void element.offsetHeight;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        initScrollSpy();
    }, duration);
}

/* ─────────────────────────────────────────
   SCROLL SPY SIDEBAR
───────────────────────────────────────── */
function initScrollSpy() {
    const sections = document.querySelectorAll('.doc-section');
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) a.classList.add('active');
        });
    });
}

/* ─────────────────────────────────────────
   GÉNÉRATEURS HTML
───────────────────────────────────────── */

// Génère une cmd-card à partir d'un objet commande
function genCmdCard(cmd) {

    const accesHtml = cmd.admin
        ? '<span class="cmd-badge badge-admin">ADMIN</span>'
        : (cmd.acces ?? []).map(a => '<span class="cmd-badge ' + (badgeClass[a.type] ?? 'badge-slash') + '">' + a.type + '</span>').join('');

    const badges = `
    ${accesHtml}
    <span class="cmd-toggle">▾</span>`;

    const args = (cmd.arguments ?? []).length > 0
        ? `<ul class="cmd-args">
        ${(cmd.arguments ?? []).map(a => `
            <li>
                <div><span class="arg-name">${a.nomArg}</span>→ ${a.precision}</div>
                <span class="arg-req ${a.type === 'requis' ? 'req' : 'opt'}">${a.type}</span>
            </li>`).join('')}
       </ul>`
        : '';

    const action = cmd.action
        ? `<div class="cmd-example">→ ${cmd.action}</div>`
        : '';

    return `
        <div class="cmd-card" id="${cmd.nom.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}" onclick="toggleCmd(this)">
            <div class="cmd-header">
                <div class="cmd-header-left">
                    <span class="cmd-name">${cmd.nom}</span>
                    <span class="cmd-desc">${cmd.description}</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">${badges}</div>
            </div>
            <div class="cmd-body">
                <div class="cmd-usage">${cmd.syntaxe}</div>
                ${args}
                ${action}
            </div>
        </div>`;
}

// Génère un cmd-group complet (titre + toutes ses cmd-cards)
function genCmdGroup(groupe) {
    const cards = groupe.cmds.map(genCmdCard).join('');
    return `
        <div class="cmd-group">
            <div class="cmd-group-label" id="${groupe.ancre}">${groupe.categorie}</div>
            ${cards}
        </div>`;
}

// Génère les liens de sidebar dynamiquement depuis commande[]
function genSidebarLinks() {
    return commande.map(g => `<li><a href="#${g.ancre}" class="sub">→ ${g.cmds[0].nom.split(' ')[0]}</a></li>`).join('');
}

/* ─────────────────────────────────────────
   PAGES
───────────────────────────────────────── */
function demarage() {
    const items = presentation.map((e, i) => `
        <div class="step-card">
            <div class="step-num">0${i + 1}</div>
            <div>
                <div class="step-title">${e.titre}</div>
                <div class="step-desc">${e.content}</div>
            </div>
        </div>`).join('');

    const content = `
        <div class="doc-layout-presen">
            <div class="doc-content">
                <section class="doc-section" id="start">
                    <div class="section-header">
                        <span class="section-num">01 —</span>
                        <h2 class="section-title">Présentation</h2>
                    </div>
                    <div class="steps">${items}</div>
                </section>
            </div>
        </div>`;

    changeContent('doc-content', content);
}

function commandeBot() {
    const groupes = commande.map(genCmdGroup).join('');

    const content = `
        <div class="doc-layoutCommande">
            <div class="doc-content">
                <section class="doc-section" id="commands">
                    <div class="section-header">
                        <span class="section-num">02 —</span>
                        <h2 class="section-title">Commandes</h2>
                        <div class="cmd-search-wrap">
                            <input 
                                type="text" 
                                id="cmd-search" 
                                class="cmd-search" 
                                placeholder="Rechercher une commande..."
                                oninput="filterCommandes(this.value)"
                                autocomplete="off"
                            >
                            <span class="cmd-search-icon">⌕</span>
                            <span class="cmd-search-count" id="cmd-search-count"></span>
                        </div>
                    </div>
                    <div id="cmd-results">${groupes}</div>
                </section>
            </div>
        </div>`;

    changeContent('doc-content', content);
}

function filterCommandes(query) {
    const q = query.toLowerCase().trim();
    const count = document.getElementById('cmd-search-count');
    let total = 0;

    document.querySelectorAll('.cmd-group').forEach(group => {
        let groupVisible = false;

        group.querySelectorAll('.cmd-card').forEach(card => {
            const nom = card.querySelector('.cmd-name')?.textContent.toLowerCase() ?? '';
            const desc = card.querySelector('.cmd-desc')?.textContent.toLowerCase() ?? '';
            const match = q === '' || nom.includes(q) || desc.includes(q);

            card.style.display = match ? '' : 'none';
            if (match) {
                groupVisible = true;
                total++;
            }
        });

        // Cacher le groupe entier si aucune de ses commandes ne correspond
        group.style.display = groupVisible ? '' : 'none';
    });

    count.textContent = q ? `${total} résultat${total > 1 ? 's' : ''}` : '';
}

function toggleSidebarGroup(el) {
    const submenu = el.nextElementSibling;
    const arrow = el.querySelector('.sidebar-arrow');
    const isOpen = submenu.style.display !== 'none';
    submenu.style.display = isOpen ? 'none' : 'block';
    arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';

    if (!isOpen) {
        setTimeout(() => {
            el.scrollIntoView({behavior: 'smooth', block: 'center'});
        }, 50);
    }
}

function scrollToCmd(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({behavior: 'smooth', block: 'center'});
}

const changelog_data = [
    {
        version: 'v1.0.4',
        date: '2025',
        actuelle: true,
        entrees: [
            {
                type: 'nouveaute',
                texte: 'Nouvelle commande <span class="inline-code">/premier supJoueur</span> — exclure un joueur de l\'équipe'
            },
            {
                type: 'nouveaute',
                texte: 'Nouvelle commande <span class="inline-code">/premier cancelEvent</span> — annulation d\'un événement planifié'
            },
        ]
    },
    {
        version: 'v1.0.3',
        date: '2025',
        actuelle: false,
        entrees: [
            {type: 'nouveaute', texte: 'Migration complète vers les Slash Commands natives Discord'},
            {
                type: 'nouveaute',
                texte: 'Système d\'autocomplétion dynamique sur <span class="inline-code">/valorant rank</span> et <span class="inline-code">/valorant stats</span>'
            },
            {
                type: 'nouveaute',
                texte: 'Nouvelle commande <span class="inline-code">/premier inviteJoueur</span> — invitation simultanée jusqu\'à 6 joueurs'
            },
            {type: 'bug', texte: 'Correction du crash au démarrage quand le fichier de données est vide'},
        ]
    },
    {
        version: 'v1.0.2',
        date: '2025',
        actuelle: false,
        entrees: [
            {
                type: 'nouveaute',
                texte: 'Nouvelle commande <span class="inline-code">/premier créerTeam</span> — création d\'équipe avec capitaine automatique'
            },
            {
                type: 'nouveaute',
                texte: 'Nouvelle commande <span class="inline-code">/premier inviteJoueur</span> — invitations en DM avec boutons Accepter/Refuser'
            },
            {
                type: 'nouveaute',
                texte: 'Nouvelle commande <span class="inline-code">!premier supTeam</span> — dissolution d\'équipe par le capitaine'
            },
            {type: 'bug', texte: 'Correction de l\'affichage du rang Valorant pour les joueurs non classés'},
        ]
    },
];

const entreeIcon = {
    'nouveaute': {icon: '✦', class: 'entry-nouveaute'},
    'bug': {icon: '⚑', class: 'entry-bug'},
};

function changelog() {
    const items = changelog_data.map((v, i) => {
        const entrees = v.entrees.map(e => {
            const cfg = entreeIcon[e.type] ?? entreeIcon['nouveaute'];
            return `<div class="changelog-entry ${cfg.class}">
                        <span class="entry-icon">${cfg.icon}</span>
                        ${e.texte}
                    </div>`;
        }).join('');

        return `
        <div class="changelog-item">
            <div class="changelog-header" onclick="toggleChangelog(this)">
                <div class="changelog-version">${v.version}</div>
                <div class="changelog-date">${v.date}</div>
                <span class="changelog-tag ${v.actuelle ? 'tag-current' : 'tag-old'}">${v.actuelle ? 'ACTUELLE' : 'ARCHIVÉE'}</span>
            </div>
            <div class="changelog-body" ${i > 0 ? 'style="display:none"' : ''}>
                ${entrees}
            </div>
        </div>`;
    }).join('');

    const content = `
        <div class="doc-layout-presen">
            <div class="doc-content">
                <section class="doc-section" id="changelog">
                    <div class="section-header">
                        <span class="section-num">03 —</span>
                        <h2 class="section-title">Changelog</h2>
                    </div>
                    <div class="changelog">${items}</div>
                </section>
            </div>
        </div>`;

    changeContent('doc-content', content);
}

/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('doc-content');
    if (main) {
        main.style.opacity = '1';
        main.style.transform = 'translateY(0)';
    }
    demarage();
});

function activeDiv() {
    document.querySelectorAll('*').forEach(el => {
        el.style.border = '1px solid red';
        el.style.boxSizing = 'border-box';
    });
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const body = document.querySelector('body');
    body.classList.toggle('menu-open');
    sidebar.classList.toggle('open');
}