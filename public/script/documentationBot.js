let chartInstance = null;

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
        <div class="doc-hero">
          <div class="doc-hero-inner">
            <div>
              <div class="doc-hero-kicker">// documentation technique</div>
              <h1 class="doc-hero-title">Giga<em>Bot</em></h1>
              <p class="doc-hero-sub">Bot Discord développé en Java avec JDA.</p>
            </div>
            <div class="version-tag" style="color: var(--badge-col-green)">v1.0.6 — STABLE</div>
          </div>
        </div>
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

function dashbord() {
    const content = `
    <div class="doc-layout-presen" style="width:100%; flex-direction:column; align-items:stretch; padding: 2rem;">

        <!-- HEADER DASHBOARD -->
        <div class="dash-header">
            <div>
                <span class="section-num">// dashboard</span>
                <h2 class="section-title" style="margin-top:4px;">Vue d'ensemble</h2>
            </div>
            <div class="dash-status">
                <span class="dash-dot"></span>
                <span class="dash-status-label">En ligne</span>
            </div>
        </div>
        
        <canvas id="mon-chart" height="400"></canvas>
        

        <!-- LIGNE 2 : BOT INFO + ÉQUIPES -->
        <div class="dash-grid-2">

            <!-- Infos bot -->
            <div class="dash-card">
                <div class="dash-card-header">
                    <span class="dash-card-title">Informations bot</span>
                    <span class="dash-badge" style="background:var(--badge-bg-green);color:var(--badge-col-green);border:1px solid var(--badge-bor-green);">STABLE</span>
                </div>
                <div class="dash-info-list">
                    <div class="dash-info-row">
                        <span class="dash-info-key">Version</span>
                        <span class="dash-info-val">v1.0.6</span>
                    </div>
                    <div class="dash-info-row">
                        <span class="dash-info-key">Langage</span>
                        <span class="dash-info-val">Java + JDA</span>
                    </div>
                    <div class="dash-info-row">
                        <span class="dash-info-key">Créateur</span>
                        <span class="dash-info-val">Noah Quaghebeur</span>
                    </div>
                    <div class="dash-info-row">
                        <span class="dash-info-key">Dernier déploiement</span>
                        <span class="dash-info-val">2025-06-01</span>
                    </div>
                    <div class="dash-info-row">
                        <span class="dash-info-key">Commandes slash</span>
                        <span class="dash-info-val">11 enregistrées</span>
                    </div>
                   
                </div>
            </div>

            <!-- Équipes -->
            <div class="dash-card">
                <div class="dash-card-header">
                    <span class="dash-card-title">Équipes Premier</span>
                    <span class="dash-badge" style="background:var(--badge-bg-blue);color:var(--badge-col-blue);border:1px solid var(--badge-bor-blue);">4 équipes</span>
                </div>
                <div class="dash-team-list">
                    <div class="dash-team-row">
                        <span class="dash-team-name">TeamAlpha</span>
                        <span class="dash-team-count">7 / 7</span>
                        <span class="dash-badge" style="background:var(--badge-bg-red);color:var(--badge-col-red);border:1px solid var(--badge-bor-red);">FULL</span>
                    </div>
                    <div class="dash-team-row">
                        <span class="dash-team-name">NovaFive</span>
                        <span class="dash-team-count">5 / 7</span>
                        <span class="dash-badge" style="background:var(--badge-bg-green);color:var(--badge-col-green);border:1px solid var(--badge-bor-green);">OUVERTE</span>
                    </div>
                    <div class="dash-team-row">
                        <span class="dash-team-name">PhantomSquad</span>
                        <span class="dash-team-count">3 / 7</span>
                        <span class="dash-badge" style="background:var(--badge-bg-green);color:var(--badge-col-green);border:1px solid var(--badge-bor-green);">OUVERTE</span>
                    </div>
                    <div class="dash-team-row">
                        <span class="dash-team-name">IronWolves</span>
                        <span class="dash-team-count">6 / 7</span>
                        <span class="dash-badge" style="background:var(--badge-bg-yellow);color:var(--badge-col-yellow);border:1px solid var(--badge-bor-yellow);">PRESQUE</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- LIGNE 3 : EVENTS + LOGS -->
        <div class="dash-grid-2">

            <!-- Prochains events -->
            <div class="dash-card">
                <div class="dash-card-header">
                    <span class="dash-card-title">Prochains événements</span>
                </div>
                <div class="dash-event-list">
                    <div class="dash-event-row">
                        <div class="dash-event-date">Sam 07 Juin — 20:00</div>
                        <div class="dash-event-team">TeamAlpha</div>
                        <span class="dash-badge" style="background:var(--badge-bg-yellow);color:var(--badge-col-yellow);border:1px solid var(--badge-bor-yellow);">Dans 2j</span>
                    </div>
                    <div class="dash-event-row">
                        <div class="dash-event-date">Dim 08 Juin — 19:30</div>
                        <div class="dash-event-team">NovaFive</div>
                        <span class="dash-badge" style="background:var(--badge-bg-yellow);color:var(--badge-col-yellow);border:1px solid var(--badge-bor-yellow);">Dans 3j</span>
                    </div>
                    <div class="dash-event-row">
                        <div class="dash-event-date">Mer 11 Juin — 21:00</div>
                        <div class="dash-event-team">IronWolves</div>
                        <span class="dash-badge" style="background:var(--badge-bg-green);color:var(--badge-col-green);border:1px solid var(--badge-bor-green);">Dans 6j</span>
                    </div>
                </div>
            </div>

            <!-- Derniers logs -->
            <div class="dash-card">
                <div class="dash-card-header">
                    <span class="dash-card-title">Derniers logs</span>
                </div>
                <div class="dash-log-list">
                    <div class="dash-log-row">
                        <span class="dash-log-time">14:32:01</span>
                        <span class="dash-log-tag tag-ok">OK</span>
                        <span class="dash-log-msg">NoahQ a rejoint TeamAlpha</span>
                    </div>
                    <div class="dash-log-row">
                        <span class="dash-log-time">13:18:44</span>
                        <span class="dash-log-tag tag-ok">OK</span>
                        <span class="dash-log-msg">Événement créé pour IronWolves</span>
                    </div>
                    <div class="dash-log-row">
                        <span class="dash-log-time">12:05:12</span>
                        <span class="dash-log-tag tag-err">ERR</span>
                        <span class="dash-log-msg">Invitation refusée par Valkyrie#2241</span>
                    </div>
                    <div class="dash-log-row">
                        <span class="dash-log-time">11:50:03</span>
                        <span class="dash-log-tag tag-ok">OK</span>
                        <span class="dash-log-msg">PhantomSquad créée par Shadow#8821</span>
                    </div>
                    <div class="dash-log-row">
                        <span class="dash-log-time">10:30:22</span>
                        <span class="dash-log-tag tag-warn">WARN</span>
                        <span class="dash-log-msg">bot start — reminders chargés (3)</span>
                    </div>
                </div>
            </div>
        </div>

    </div>`;

    changeContent('doc-content', content);

    setTimeout(() => {
        const ctx = document.getElementById('mon-chart');
        if (!ctx) return;
        if (chartInstance) {
            chartInstance.destroy();
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juillet', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
                datasets: [{
                    label: 'Commandes exécutées',
                    data: [0, 34, 28, 45, 4, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(124,111,224,0.2)',
                    borderColor: '#7c6fe0',
                    borderWidth: 1.5,
                    tension: 0.3,
                    fill: true,
                }, {
                    label: 'Bugs signalés',
                    data: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(232,64,64,0.1)',
                    borderColor: '#e84040',
                    borderWidth: 1.5,
                    tension: 0.3,
                    fill: true,
                }, {
                    label: 'Serveurs actifs',
                    data: [0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(76,175,80,0.1)',
                    borderColor: '#4caf50',
                    borderWidth: 1.5,
                    tension: 0.3,
                    fill: true,
                }, {
                    label: 'Équipes Premier',
                    data: [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(255, 160, 0, 0.1)',
                    borderColor: '#e6900a',
                    borderWidth: 1.5,
                    tension: 0.3,
                    fill: true,
                }, {
                    label: 'Bugs Résolu',
                    data: [0, 0, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(0,255,196,0.1)',
                    borderColor: '#0ae6e6',
                    borderWidth: 1.5,
                    tension: 0.3,
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: getComputedStyle(document.documentElement)
                                .getPropertyValue('--ink').trim(),
                            font: {family: 'IBM Plex Mono', size: 11}
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: getComputedStyle(document.documentElement)
                                .getPropertyValue('--ink3').trim(),
                            font: {family: 'IBM Plex Mono', size: 11}
                        },
                        grid: {
                            color: getComputedStyle(document.documentElement)
                                .getPropertyValue('--rule').trim()
                        }
                    },
                    y: {
                        ticks: {
                            color: getComputedStyle(document.documentElement)
                                .getPropertyValue('--ink3').trim(),
                            font: {family: 'IBM Plex Mono', size: 11}
                        },
                        grid: {
                            color: getComputedStyle(document.documentElement)
                                .getPropertyValue('--rule').trim()
                        }
                    }
                }
            }
        });
    }, 350);
}

function report() {
    const reports = [
        {
            id: 'BUG-001',
            titre: 'Invitation DM non reçue',
            desc: 'Certains joueurs ne reçoivent pas le DM d\'invitation lors d\'un /premier inviteJoueur. Semble lié aux paramètres de confidentialité Discord.',
            auteur: 'TazerZ#4421',
            date: '2025-05-28',
            statut: 'resolu',
            version: 'v1.0.5',
            corrigeDans: 'v1.0.6',
        },
        {
            id: 'BUG-002',
            titre: 'Bot silencieux sur /premier teamInvite',
            desc: 'La commande ne répond pas du tout après exécution. Aucun message visible, aucun log. Problème de routing slash command.',
            auteur: 'NoahQ#0001',
            date: '2025-05-30',
            statut: 'resolu',
            version: 'v1.0.5',
            corrigeDans: 'v1.0.6',
        },
        {
            id: 'BUG-003',
            titre: '[OBJECT OBJECT] dans les badges',
            desc: 'Les badges d\'accès affichent [object Object] au lieu du nom du rôle. Causé par un .map() sur un tableau d\'objets sans accéder à .type.',
            auteur: 'NoahQ#0001',
            date: '2025-06-01',
            statut: 'resolu',
            version: 'v1.0.6',
            corrigeDans: 'v1.0.6',
        },
        {
            id: 'BUG-004',
            titre: 'Sidebar passe sous le header',
            desc: 'La sidebar s\'affiche par-dessus le footer mais reste en-dessous du header et du hero malgré un z-index élevé. Problème de contexte d\'empilement CSS grid.',
            auteur: 'NoahQ#0001',
            date: '2025-06-02',
            statut: 'en-cours',
            version: 'v1.0.6',
            corrigeDans: null,
        },
        {
            id: 'BUG-005',
            titre: 'Transition de page trop lente',
            desc: 'La transition CSS sur .doc-content est à 2s ce qui rend la navigation lourde.',
            auteur: 'MaxoR#1337',
            date: '2025-06-03',
            statut: 'en-attente',
            version: 'v1.0.6',
            corrigeDans: null,
        },
        {
            id: 'BUG-006',
            titre: 'Autocomplétion /valorant vide',
            desc: 'Quand la base de données de pseudos est vide, l\'autocomplétion plante au lieu de retourner une liste vide.',
            auteur: 'TazerZ#4421',
            date: '2025-06-04',
            statut: 'en-attente',
            version: 'v1.0.6',
            corrigeDans: null,
        },
    ];

    const statutCfg = {
        'resolu': {
            label: 'RÉSOLU',
            bg: 'var(--badge-bg-green)',
            col: 'var(--badge-col-green)',
            bor: 'var(--badge-bor-green)',
            icon: '✓'
        },
        'en-cours': {
            label: 'EN COURS',
            bg: 'var(--badge-bg-yellow)',
            col: 'var(--badge-col-yellow)',
            bor: 'var(--badge-bor-yellow)',
            icon: '◎'
        },
        'en-attente': {
            label: 'EN ATTENTE',
            bg: 'var(--badge-bg-red)',
            col: 'var(--badge-col-red)',
            bor: 'var(--badge-bor-red)',
            icon: '○'
        },
    };

    const resolved = reports.filter(r => r.statut === 'resolu');
    const inProgress = reports.filter(r => r.statut === 'en-cours');
    const pending = reports.filter(r => r.statut === 'en-attente');

    // Génère une ligne de table (pour les résolus)
    function genTableRow(r) {
        const s = statutCfg[r.statut];
        return `
        <tr class="report-table-row" onclick="this.classList.toggle('open')">
            <td class="report-td-id">${r.id}</td>
            <td class="report-td-titre">
                <div class="report-titre">${r.titre}</div>
                <div class="report-desc-hidden">${r.desc}</div>
            </td>
            <td><span class="report-badge" style="background:${s.bg};color:${s.col};border:1px solid;${s.bor};">${s.icon} ${s.label}</span></td>
            <td class="report-td-meta">${r.version}</td>
            <td class="report-td-meta">${r.corrigeDans ?? '—'}</td>
            <td class="report-td-meta report-date">${r.date}</td>
        </tr>`;
    }

    // Génère une card kanban (pour en-cours et en-attente)
    function genKanbanCard(r) {
        const s = statutCfg[r.statut];
        return `
        <div class="report-kanban-card">
            <div class="report-kanban-top">
                <span class="report-kanban-id">${r.id}</span>
                <span class="report-badge" style="background:${s.bg};color:${s.col};border:1px solid ${s.bor};">${s.icon} ${s.label}</span>
            </div>
            <div class="report-kanban-titre">${r.titre}</div>
            <div class="report-kanban-desc">${r.desc}</div>
            <div class="report-kanban-footer">
                <span class="report-kanban-author">${r.auteur}</span>
                <span class="report-kanban-date">${r.date}</span>
            </div>
        </div>`;
    }

    const content = `
    <div class="doc-layout-presen" style="width:100%; flex-direction:column; align-items:stretch; padding:2rem; gap:2.5rem;">

        <!-- HEADER + COMPTEURS -->
        <div class="dash-header">
            <div>
                <span class="section-num">// reports</span>
                <h2 class="section-title" style="margin-top:4px;">Bug Reports</h2>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <span class="report-badge" style="background:var(--badge-bg-red);color:var(--badge-col-red);border:1px solid var(--badge-bor-red);">○ ${pending.length} en attente</span>
                <span class="report-badge" style="background:var(--badge-bg-yellow);color:var(--badge-col-yellow);border:1px solid var(--badge-bor-yellow);">◎ ${inProgress.length} en cours</span>
                <span class="report-badge" style="background:var(--badge-bg-green);color:var(--badge-col-green);border:1px solid var(--badge-bor-green);">✓ ${resolved.length} résolus</span>
            </div>
        </div>

        <!-- BLOC 1 : EN ATTENTE + EN COURS — Kanban -->
        <div>
            <div class="contrib-section-label">// à traiter</div>
            <div class="report-kanban-cols">

                <div class="report-kanban-col">
                    <div class="report-kanban-col-header" style="border-color:var(--badge-col-red);">
                        <span>EN ATTENTE</span>
                        <span class="report-badge" style="background:var(--badge-bg-red);color:var(--badge-col-red);border:1px solid var(--badge-bor-red);">${pending.length}</span>
                    </div>
                    ${pending.map(genKanbanCard).join('') || '<div class="report-empty">Aucun bug en attente ✓</div>'}
                </div>

                <div class="report-kanban-col">
                    <div class="report-kanban-col-header" style="border-color:var(--badge-col-yellow);">
                        <span>EN COURS</span>
                        <span class="report-badge" style="background:var(--badge-bg-yellow);color:var(--badge-col-yellow);border:1px solid var(--badge-bor-yellow);">${inProgress.length}</span>
                    </div>
                    ${inProgress.map(genKanbanCard).join('') || '<div class="report-empty">Aucun bug en cours</div>'}
                </div>

            </div>
        </div>

        <!-- BLOC 2 : RÉSOLUS — Table cliquable -->
        <div>
            <div class="contrib-section-label">// résolus</div>
            <div class="report-table-wrap">
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titre</th>
                            <th>Statut</th>
                            <th>Signalé en</th>
                            <th>Corrigé en</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${resolved.map(genTableRow).join('')}
                    </tbody>
                </table>
            </div>
            <div class="report-table-hint">↑ Cliquer sur une ligne pour voir la description</div>
        </div>

    </div>`;

    changeContent('doc-content', content);
}

function projet() {
    const arborescenceFichiers = [
        {
            nom: 'trackerValo.json', type: 'file-json',
        },
        {
            nom: 'ValoDs.json', type: 'file-json',
        },
        {
            nom: 'java', type: 'folder', open: true, children: [
                {
                    nom: 'bot.discordBot', type: 'folder', open: true, children: [
                        {
                            nom: 'commands', type: 'folder', open: true, children: [
                                {
                                    nom: 'Help', type: 'folder', children: [
                                        {nom: 'CommandHelpAll', type: 'class'},
                                    ]
                                },
                                {
                                    nom: 'Premier', type: 'folder', children: [
                                        {nom: 'CommandPremierAddTeam', type: 'class'},
                                        {nom: 'CommandPremierCancelEvent', type: 'class'},
                                        {nom: 'CommandPremierEvent', type: 'class'},
                                        {nom: 'CommandPremierNewCapitaine', type: 'class'},
                                        {nom: 'CommandPremierStratAgent', type: 'class'},
                                        {nom: 'CommandPremierSuprimerJoueur', type: 'class'},
                                        {nom: 'CommandPremierSuprimerTeam', type: 'class'},
                                        {nom: 'CommandPremierTeamInvite', type: 'class'},
                                    ]
                                },
                                {
                                    nom: 'Valo', type: 'folder', children: [
                                        {nom: 'CommandBot', type: 'class'},
                                        {nom: 'CommandDoc', type: 'class'},
                                        {nom: 'CommandEdtDev', type: 'class'},
                                        {nom: 'CommandHelp', type: 'class'},
                                        {nom: 'CommandNew', type: 'class'},
                                        {nom: 'CommandPremier', type: 'class'},
                                        {nom: 'CommandRegistery', type: 'class'},
                                        {nom: 'CommandReport', type: 'class'},
                                        {nom: 'CommandValo', type: 'class'},
                                    ]
                                },
                                {
                                    nom: 'System', type: 'folder', children: [
                                        {nom: 'GameConfigRole', type: 'class'},
                                        {nom: 'RankScheduler', type: 'class'},
                                        {nom: 'ServeurDs', type: 'class'},
                                    ]
                                },
                            ]
                        },
                        {
                            nom: 'utils', type: 'folder', children: [
                                {
                                    nom: 'commands', type: 'folder', children: [
                                        {
                                            nom: 'datamanager', type: 'folder', children: [
                                                {
                                                    nom: 'DataStructure', type: 'folder', children: [
                                                        {nom: 'Bug', type: 'class'},
                                                        {nom: 'CompteValoDiscord', type: 'class'},
                                                        {nom: 'Equipe', type: 'class'},
                                                        {nom: 'Games', type: 'class'},
                                                        {nom: 'Nouveaute', type: 'class'},
                                                        {nom: 'Rappel', type: 'class'},
                                                        {nom: 'StrucNew', type: 'class'},
                                                        {nom: 'TrackedPlayer', type: 'class'},
                                                    ]
                                                },
                                                {nom: 'CommandLog', type: 'class'},
                                                {nom: 'DataManager', type: 'class'},
                                                {nom: 'Fichier', type: 'class'},
                                                {nom: 'logManager', type: 'class'},
                                            ]
                                        },
                                        {nom: 'Code', type: 'enum'},
                                        {nom: 'Command', type: 'class'},
                                        {nom: 'CommandContext', type: 'class'},
                                        {nom: 'CommandExecutor', type: 'interface'},
                                        {nom: 'CommandRegistry', type: 'class'},
                                        {nom: 'MessageManager', type: 'class'},
                                    ]
                                },
                                {
                                    nom: 'Exception', type: 'folder', children: [
                                        {nom: 'ApiException', type: 'exception'},
                                        {nom: 'CapitaineException', type: 'exception'},
                                        {nom: 'DateException', type: 'exception'},
                                        {nom: 'DefaultException', type: 'class'},
                                        {nom: 'EquipeException', type: 'exception'},
                                        {nom: 'JoueurException', type: 'exception'},
                                        {nom: 'NoDataFoundException', type: 'exception'},
                                        {nom: 'RappelException', type: 'exception'},
                                        {nom: 'SyntaxeException', type: 'exception'},
                                    ]
                                },
                                {
                                    nom: 'Procedure', type: 'folder', children: [
                                        {nom: 'ApiProcedure', type: 'class'},
                                        {nom: 'BotProcedure', type: 'class'},
                                        {nom: 'ValoDisProcedure', type: 'class'},
                                    ]
                                },
                                {
                                    nom: 'Success', type: 'folder', children: [
                                        {nom: 'success', type: 'class'},
                                    ]
                                },
                                {nom: 'ConfigManager', type: 'class'},
                            ]
                        },
                        {nom: 'Main', type: 'class-main'},
                    ]
                }
            ]
        }
    ];

    const typeIcon = {
        'folder': {icon: '📁', col: '#e6900a'},
        'file-json': {icon: '{ }', col: '#818cf8', mono: true},
        'class': {icon: 'C', col: '#4caf50', circle: true},
        'class-main': {icon: 'C', col: '#e84040', circle: true},
        'interface': {icon: 'I', col: '#4dd0e1', circle: true},
        'enum': {icon: 'E', col: '#f0a060', circle: true},
        'exception': {icon: '⚡', col: '#e6900a'},
    };

    function genNode(node, depth = 0) {
        const cfg = typeIcon[node.type] ?? typeIcon['class'];
        const indent = depth * 16;

        if (node.type === 'folder') {
            const childrenHtml = (node.children ?? []).map(c => genNode(c, depth + 1)).join('');
            return `
                <div class="tree-folder" style="--indent:${indent}px">
                    <div class="tree-row tree-folder-row" onclick="this.parentElement.classList.toggle('closed')">
                        <span class="tree-indent"></span>
                        <span class="tree-arrow">▾</span>
                        <span class="tree-icon" style="color:${cfg.col}">📁</span>
                        <span class="tree-name tree-name-folder">${node.nom}</span>
                    </div>
                    <div class="tree-children">${childrenHtml}</div>
                </div>`;
        }

        const iconEl = cfg.circle
            ? `<span class="tree-icon-circle" style="background:${cfg.col}20;color:${cfg.col};border-color:${cfg.col}40">${cfg.icon}</span>`
            : cfg.mono
                ? `<span class="tree-icon-mono" style="color:${cfg.col}">${cfg.icon}</span>`
                : `<span class="tree-icon">${cfg.icon}</span>`;

        return `
            <div class="tree-row tree-leaf" style="--indent:${indent}px">
                <span class="tree-indent"></span>
                ${iconEl}
                <span class="tree-name" style="color:${cfg.col}">${node.nom}</span>
                ${node.type === 'class-main' ? '<span class="tree-tag">entry point</span>' : ''}
            </div>`;
    }

    const treeHtml = arborescenceFichiers.map(n => genNode(n, 0)).join('');

    const content = `
    <div class="doc-layout-presen" style="width:100%;flex-direction:column;align-items:stretch;padding:2rem;gap:2.5rem;">

        <!-- HEADER -->
        <div class="dash-header">
            <div>
                <span class="section-num">// projet</span>
                <h2 class="section-title" style="margin-top:4px;">GigaBot</h2>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                <span class="report-badge" style="background:var(--badge-bg-green);color:var(--badge-col-green);border:1px solid var(--badge-bor-green);">v1.0.6 STABLE</span>
                <span class="report-badge" style="background:var(--badge-bg-blue);color:var(--badge-col-blue);border:1px solid var(--badge-bor-blue);">Java + JDA</span>
            </div>
        </div>

        <!-- BLOC 1 : PRÉSENTATION — grande bannière sobre -->
        <div class="projet-banner">
            <div class="projet-banner-left">
                <div class="projet-banner-logo">GB</div>
            </div>
            <div class="projet-banner-body">
                <div class="contrib-section-label" style="margin-bottom:6px;">// description</div>
                <p class="projet-banner-desc">Bot Discord développé en Java avec la librairie JDA. Il centralise la gestion des équipes <strong>Premier Valorant</strong> d'un serveur : création d'équipes, invitations, événements planifiés avec rappels automatiques, et suivi des statistiques Valorant via l'API Henrik.</p>
                <div class="projet-banner-tags">
                    <span class="contrib-tech">Java 17</span>
                    <span class="contrib-tech">JDA 5</span>
                    <span class="contrib-tech">JSON</span>
                    <span class="contrib-tech">Henrik API</span>
                    <span class="contrib-tech">Discord Slash Commands</span>
                    <span class="contrib-tech">Scheduler</span>
                </div>
            </div>
            <div class="projet-banner-stats">
                <div class="contrib-mini-stat"><div class="contrib-mini-val">11</div><div class="contrib-mini-lbl">commandes</div></div>
                <div class="contrib-mini-stat"><div class="contrib-mini-val">9</div><div class="contrib-mini-lbl">exceptions</div></div>
                <div class="contrib-mini-stat"><div class="contrib-mini-val">8</div><div class="contrib-mini-lbl">data structs</div></div>
            </div>
        </div>

        <!-- BLOC 2 : ARCHITECTURE — 2 colonnes texte + arbre -->
        <div class="projet-archi-grid">

            <!-- Colonne gauche : explication -->
            <div style="display:flex;flex-direction:column;gap:1.5rem;">

                <div class="contrib-section-label">// architecture</div>

                <div class="projet-archi-block">
                    <div class="projet-archi-title">
                        <span class="projet-archi-dot" style="background:var(--badge-col-blue)"></span>
                        commands/
                    </div>
                    <p class="projet-archi-desc">Toutes les commandes slash, organisées en sous-dossiers thématiques : <code>Premier</code> pour la gestion d'équipe, <code>Valo</code> pour les commandes générales et utilitaires, <code>System</code> pour la configuration serveur.</p>
                </div>

                <div class="projet-archi-block">
                    <div class="projet-archi-title">
                        <span class="projet-archi-dot" style="background:var(--badge-col-green)"></span>
                        utils/commands/
                    </div>
                    <p class="projet-archi-desc">Infrastructure des commandes : <code>CommandContext</code> unifie slash et message, <code>MessageManager</code> route les événements Discord, <code>CommandRegistry</code> enregistre les commandes au démarrage.</p>
                </div>

                <div class="projet-archi-block">
                    <div class="projet-archi-title">
                        <span class="projet-archi-dot" style="background:var(--badge-col-yellow)"></span>
                        datamanager/
                    </div>
                    <p class="projet-archi-desc">Persistance JSON : <code>DataManager</code> lit/écrit les fichiers, <code>DataStructure</code> contient les classes de données (Equipe, Rappel, CompteValoDiscord…), <code>logManager</code> gère les logs.</p>
                </div>

                <div class="projet-archi-block">
                    <div class="projet-archi-title">
                        <span class="projet-archi-dot" style="background:var(--badge-col-red)"></span>
                        Exception/ + Procedure/
                    </div>
                    <p class="projet-archi-desc">Exceptions typées pour chaque cas métier (CapitaineException, JoueurException…). Les Procedures centralisent la logique métier réutilisée entre commandes (ex: vérifier si un joueur est déjà en équipe).</p>
                </div>

                <div class="projet-archi-block">
                    <div class="projet-archi-title">
                        <span class="projet-archi-dot" style="background:#e84040"></span>
                        Main.java
                    </div>
                    <p class="projet-archi-desc">Point d'entrée. Connexion à l'API Discord, enregistrement global des slash commands, restauration des rappels planifiés au démarrage.</p>
                </div>

            </div>

            <!-- Colonne droite : arbre de fichiers -->
            <div>
                <div class="contrib-section-label">// structure des fichiers</div>
                <div class="projet-tree-wrap">
                    <div class="projet-tree">${treeHtml}</div>
                </div>
            </div>

        </div>

        <!-- BLOC 3 : FLUX — étapes horizontales -->
        <div>
            <div class="contrib-section-label">// fonctionnement — cycle d'une commande</div>
            <div class="projet-flow">
                <div class="projet-flow-step">
                    <div class="projet-flow-num">01</div>
                    <div class="projet-flow-title">Événement Discord</div>
                    <div class="projet-flow-desc">L'utilisateur tape <code>/premier inviteJoueur</code>. JDA émet un <code>SlashCommandCreateEvent</code>.</div>
                </div>
                <div class="projet-flow-arrow">→</div>
                <div class="projet-flow-step">
                    <div class="projet-flow-num">02</div>
                    <div class="projet-flow-title">MessageManager</div>
                    <div class="projet-flow-desc">Reçoit l'event, crée un <code>CommandContext</code>, cherche la commande dans le <code>CommandRegistry</code>.</div>
                </div>
                <div class="projet-flow-arrow">→</div>
                <div class="projet-flow-step">
                    <div class="projet-flow-num">03</div>
                    <div class="projet-flow-title">CommandPremier</div>
                    <div class="projet-flow-desc">Route vers <code>CommandPremierTeamInvite</code> selon le sous-commande lu dans les options.</div>
                </div>
                <div class="projet-flow-arrow">→</div>
                <div class="projet-flow-step">
                    <div class="projet-flow-num">04</div>
                    <div class="projet-flow-title">Logique métier</div>
                    <div class="projet-flow-desc">Vérifie via <code>EquipeProcedure</code>, charge les données JSON via <code>DataManager</code>, envoie les DM.</div>
                </div>
                <div class="projet-flow-arrow">→</div>
                <div class="projet-flow-step">
                    <div class="projet-flow-num">05</div>
                    <div class="projet-flow-title">Réponse</div>
                    <div class="projet-flow-desc"><code>ctx.replyDeferred()</code> envoie la réponse Discord. Les erreurs sont catchées et loggées.</div>
                </div>
            </div>
        </div>
    </div>`;

    changeContent('doc-content', content);
}

function contributeur() {
    const content = `
    <div class="doc-layout-presen" style="width:100%; flex-direction:column; align-items:stretch; padding: 2rem; gap: 2rem;">

        <!-- HEADER -->
        <div class="dash-header">
            <div>
                <span class="section-num">// équipe</span>
                <h2 class="section-title" style="margin-top:4px;">Contributeurs</h2>
            </div>
            <span class="dash-badge" style="background:var(--badge-bg-blue);color:var(--badge-col-blue);border:1px solid var(--badge-bor-blue);">3 membres</span>
        </div>

        <!-- BLOC 1 : LEAD DEV — grande carte horizontale -->
        <div class="contrib-hero-card">
            <div class="contrib-hero-left">
                <div class="contrib-avatar contrib-avatar-xl">NQ</div>
            </div>
            <div class="contrib-hero-body">
                <div class="contrib-hero-meta">
                    <span class="contrib-role-tag" style="background:var(--badge-bg-red);color:var(--badge-col-red);border:1px solid var(--badge-bor-red);">LEAD DEV</span>
                    <span class="contrib-since">depuis Fév 2026</span>
                </div>
                <h3 class="contrib-hero-name">Noah Quaghebeur</h3>
                <p class="contrib-hero-desc">Développeur principal du projet. Architecture du bot, intégration JDA, système de commandes slash, gestion des données et déploiement.</p>
                <div class="contrib-tech-row">
                    <span class="contrib-tech">Java</span>
                    <span class="contrib-tech">JDA</span>
                    <span class="contrib-tech">JSON</span>
                    <span class="contrib-tech">HTML/CSS/JS</span>
                </div>
            </div>
            <div class="contrib-hero-stats">
                <div class="contrib-mini-stat">
                    <div class="contrib-mini-val">142</div>
                    <div class="contrib-mini-lbl">commits</div>
                </div>
                <div class="contrib-mini-stat">
                    <div class="contrib-mini-val">11</div>
                    <div class="contrib-mini-lbl">commandes</div>
                </div>
            </div>
        </div>

        <!-- BLOC 2 : CONTRIBUTEURS — grille de cartes verticales -->
        <div>
            <div class="contrib-section-label">// contributeurs</div>
            <div class="contrib-grid-3">

                <div class="contrib-card contrib-card-dashed">
                    <div class="contrib-card-top">
                        <div class="contrib-avatar contrib-avatar-md" style="background:var(--bg3);color:var(--ink3);">?</div>
                        <div class="contrib-card-info">
                            <div class="contrib-card-name" style="color:var(--ink3);">Poste ouvert</div>
                            <div class="contrib-card-pseudo">—</div>
                        </div>
                    </div>
                    <span class="contrib-role-tag" style="background:var(--bg3);color:var(--ink3);border:1px solid var(--rule);">TESTEUR</span>
                    <p class="contrib-card-desc" style="color:var(--ink3);">Une place est disponible pour un contributeur supplémentaire.</p>
                    <div class="contrib-card-footer"></div>
                </div>
                               
                <div class="contrib-card contrib-card-dashed">
                    <div class="contrib-card-top">
                        <div class="contrib-avatar contrib-avatar-md" style="background:var(--bg3);color:var(--ink3);">?</div>
                        <div class="contrib-card-info">
                            <div class="contrib-card-name" style="color:var(--ink3);">Poste ouvert</div>
                            <div class="contrib-card-pseudo">—</div>
                        </div>
                    </div>
                    <span class="contrib-role-tag" style="background:var(--bg3);color:var(--ink3);border:1px solid var(--rule);">DESIGN</span>
                    <p class="contrib-card-desc" style="color:var(--ink3);">Une place est disponible pour un contributeur supplémentaire.</p>
                    <div class="contrib-card-footer"></div>
                </div>

                <div class="contrib-card contrib-card-dashed">
                    <div class="contrib-card-top">
                        <div class="contrib-avatar contrib-avatar-md" style="background:var(--bg3);color:var(--ink3);">?</div>
                        <div class="contrib-card-info">
                            <div class="contrib-card-name" style="color:var(--ink3);">Poste ouvert</div>
                            <div class="contrib-card-pseudo">—</div>
                        </div>
                    </div>
                    <span class="contrib-role-tag" style="background:var(--bg3);color:var(--ink3);border:1px solid var(--rule);">À POURVOIR</span>
                    <p class="contrib-card-desc" style="color:var(--ink3);">Une place est disponible pour un contributeur supplémentaire.</p>
                    <div class="contrib-card-footer"></div>
                </div>

            </div>
        </div>

        <!-- BLOC 3 : REMERCIEMENTS — liste horizontale sobre -->
        <div class="contrib-thanks-wrap">
            <div class="contrib-section-label">// remerciements</div>
            <div class="contrib-thanks-list">
                <div class="contrib-thanks-item">
                    <span class="contrib-thanks-name">Javacord</span>
                    <span class="contrib-thanks-desc">Première librairie Discord utilisée pour prototyper le bot</span>
                </div>
                <div class="contrib-thanks-item">
                    <span class="contrib-thanks-name">JDA</span>
                    <span class="contrib-thanks-desc">Librairie Java utilisée en production</span>
                </div>
                <div class="contrib-thanks-item">
                    <span class="contrib-thanks-name">IUT Grand Ouest</span>
                    <span class="contrib-thanks-desc">Formation BUT Informatique 2025–2026</span>
                </div>
            </div>
        </div>

    </div>`;

    changeContent('doc-content', content);
}

function compte() {
    window.location.href = "../page/login.html";
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
