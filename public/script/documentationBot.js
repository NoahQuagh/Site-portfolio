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
                acces:[
                    {
                        type:'CAPITAINE'
                    },
                    {
                        type:'ADJOINT'
                    }],
                admin: false,
                syntaxe: '/premier event &lt;jj&gt; &lt;mm&gt; &lt;aaaa&gt; &lt;hh&gt; &lt;mm&gt;',
                arguments: [
                    { nomArg: 'jour',   type: 'requis',    precision: 'Jour du match (format jj)' },
                    { nomArg: 'mois',   type: 'requis',    precision: 'Mois du match (format mm)' },
                    { nomArg: 'année',  type: 'requis',    precision: 'Année du match (format aaaa)' },
                    { nomArg: 'heure',  type: 'requis',    precision: 'Heure du match (format hh)' },
                    { nomArg: 'minute', type: 'requis',    precision: 'Minute du match (format mm)' },
                ],
                action: 'Envoie une invitation en message privé sur Discord à tous les membres de votre équipe, avec des boutons Participer / Refuser. Un rappel est automatiquement créé après validation de la participation. Ce rappel est envoyé 30 min avant le match.'
            },
            {
                nom: '/premier créerTeam',
                description: 'Créer sa team Premier et en devenir capitaine',
                acces:[
                    {
                        type:'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/premier créerTeam nom:&lt;nomEquipe&gt;',
                arguments: [
                    { nomArg: 'nom', type: 'requis', precision: 'Nom unique de l\'équipe Premier' },
                ],
                action: 'Vous devenez automatiquement capitaine. Un seul joueur peut être capitaine. Le nom d\'équipe doit être unique.'
            },
            {
                nom: '/premier inviteJoueur',
                description: 'Inviter jusqu\'à 6 joueurs dans sa team',
                acces:[
                    {
                        type:'CAPITAINE'
                    }],
                admin: false,
                syntaxe: '/premier inviteJoueur joueur1:@user [joueur2..6]',
                arguments: [
                    { nomArg: 'joueur_1',   type: 'requis',    precision: 'Premier joueur à inviter (mention)' },
                    { nomArg: 'joueur_2–6', type: 'optionnel', precision: 'Joueurs supplémentaires (jusqu\'à 6 au total)' },
                ],
                action: 'Chaque joueur reçoit une invitation en DM. Réservé au capitaine. Maximum 7 joueurs par équipe.'
            },
            {
                nom: '/premier supTeam',
                description: 'Dissoudre son équipe Premier',
                acces:[
                    {
                        type:'CAPITAINE'
                    }],
                admin: false,
                syntaxe: '/premier supTeam',
                arguments: [
                    { nomArg: 'aucune option', type: 'sans option', precision: 'Commande sans paramètres' },
                ],
                action: 'Supprime définitivement l\'équipe. Le nom et les joueurs sont libérés. Réservé au capitaine.'
            },
            {
                nom: '/premier supJoueur',
                description: 'Exclure un joueur de l\'équipe',
                acces:[
                    {
                        type:'CAPITAINE'
                    }],
                admin: false,
                syntaxe: '/premier supJoueur joueur:@user',
                arguments: [
                    { nomArg: 'joueur', type: 'requis', precision: 'Joueur à exclure (mention)' },
                ],
                action: 'Réservé au capitaine. Le joueur est retiré de l\'équipe immédiatement.'
            },
            {
                nom: '/premier cancelEvent',
                description: 'Annuler un événement de game planifié',
                acces:[
                    {
                        type:'CAPITAINE'
                    },
                    {
                        type:'ADJOINT'
                    }],
                admin: false,
                syntaxe: '/premier cancelEvent jour:&lt;jj&gt; mois:&lt;mm&gt; année:&lt;aaaa&gt; heure:&lt;hh&gt; minute:&lt;mm&gt;',
                arguments: [
                    { nomArg: 'jour/mois/année', type: 'requis', precision: 'Date de l\'événement à annuler' },
                    { nomArg: 'heure/minute',    type: 'requis', precision: 'Heure de l\'événement à annuler' },
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
                acces:[
                    {
                        type:'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/valorant rank pseudotag:&lt;Pseudo#Tag&gt;',
                arguments: [
                    { nomArg: 'pseudotag', type: 'requis', precision: 'Pseudo et tag Valorant (ex: TenZ#NA1) — autocomplétion disponible' },
                ],
                action: 'Astuce : l\'autocomplétion propose les pseudos déjà recherchés. Tapez quelques lettres pour filtrer.'
            },
            {
                nom: '/valorant stats',
                description: 'Obtenir les statistiques détaillées d\'un joueur',
                acces:[
                    {
                        type:'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/valorant stats pseudotag:&lt;Pseudo#Tag&gt;',
                arguments: [
                    { nomArg: 'pseudotag', type: 'requis', precision: 'Pseudo et tag Valorant (ex: Shroud#NA1) — autocomplétion disponible' },
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
                acces:[
                    {
                        type:'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/bot',
                arguments: [],
                action: 'Version, uptime, développeur et informations techniques du bot.'
            },
            {
                nom: '/help',
                description: 'Liste des commandes disponibles',
                acces:[
                    {
                        type:'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/help [option:all]',
                arguments: [
                    { nomArg: 'option', type: 'optionnel', precision: '<code>all</code> pour lister toutes les commandes' },
                ],
                action: 'a remplir'
            },
            {
                nom: '/man',
                description: 'Manuel détaillé d\'une commande spécifique',
                acces:[
                    {
                        type:'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/man commande:&lt;nomCommande&gt;',
                arguments: [
                    { nomArg: 'commande', type: 'requis', precision: 'Nom de la commande dont vous voulez le manuel' },
                ],
                action: 'a remplir'
            },
            {
                nom: '/nouveauté',
                description: 'Voir les nouveautés et mises à jour du bot',
                acces:[
                    {
                        type:'PUBLIC'
                    }],
                admin: false,
                syntaxe: '/nouveauté [version:&lt;x.x.x&gt;]',
                arguments: [
                    { nomArg: 'version', type: 'optionnel', precision: 'Version spécifique (ex: 1.0.3). Sans argument : dernière version.' },
                ],
                action: 'a remplir'
            },
            {
                nom: '/log',
                description: 'Récupérer le fichier de logs du bot',
                acces:[
                    {
                        type:'ADMIN'
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
        titre: 'Inviter le bot sur votre serveur',
        content: 'Utilisez le lien d\'invitation OAuth2 avec les scopes <span class="inline-code">bot</span> et <span class="inline-code">applications.commands</span>. Le bot nécessite les permissions <em>Envoyer des messages</em>, <em>Lire les messages</em> et <em>Envoyer des messages en DM</em>.',
    },
    {
        titre: 'Activer le mode développeur Discord',
        content: 'Paramètres → Avancé → <em>Mode développeur</em>. Cela vous permettra de copier des IDs si nécessaire pour configurer certaines fonctionnalités.',
    },
    {
        titre: 'Utiliser les slash commands',
        content: 'Tapez <span class="inline-code">/</span> dans n\'importe quel salon pour voir la liste des commandes disponibles. Discord propose l\'autocomplétion sur les noms et les options.',
    },
    {
        titre: 'Créer votre équipe Premier',
        content: 'Commencez par <span class="inline-code">/premier créerTeam nom:NomEquipe</span> pour enregistrer votre équipe dont vous serez automatiquement le capitaine. Invitez ensuite vos coéquipiers avec <span class="inline-code">/premier inviteJoueur</span>.',
    },
];

/* ═══════════════════════════════════════════
   UTILITAIRES UI
═══════════════════════════════════════════ */
const badgeClass = {
    'ADMIN':     'badge-admin',
    'SLASH':     'badge-slash',
    'PUBLIC':    'badge-slash',
    'CAPITAINE': 'badge-capitaine',
    'ADJOINT':   'badge-adjoint',
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
    element.style.opacity    = '0';
    element.style.transform  = 'translateY(12px)';

    setTimeout(() => {
        element.innerHTML = newContent;
        void element.offsetHeight;
        element.style.opacity   = '1';
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
    // Génère tous les groupes depuis la constante commande[]
    const groupes = commande.map(genCmdGroup).join('');

    // Génère les liens sidebar depuis commande[]
    const sidebarLinks = commande.map(g => `
    <li>
        <div class="sidebar-group" onclick="toggleSidebarGroup(this)">
            <span>/${g.ancre.split(' ')[0]}</span>
            <span class="sidebar-arrow">▾</span>
        </div>
        <ul class="sidebar-submenu" style="display:none">
            ${g.cmds.map(cmd => `
                <li><a href="#" onclick="scrollToCmd('${cmd.nom.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}'); return false;" class="sub">→ ${cmd.nom}</a></li>
            `).join('')}
        </ul>
    </li>`).join('');

    const content = `
    <div class="doc-layoutCommande">
        <aside class="doc-sidebar">
            <div class="sidebar-label">// navigation</div>
            <ul class="sidebar-nav">
                ${sidebarLinks}
            </ul>
        </aside>
        <div class="doc-content">
            <section class="doc-section" id="commands">
                <div class="section-header">
                    <span class="section-num">02 —</span>
                    <h2 class="section-title">Commandes</h2>
                </div>
                ${groupes}
            </section>
        </div>
    </div>`;

    changeContent('doc-content', content);
}

function toggleSidebarGroup(el) {
    const submenu = el.nextElementSibling;
    const arrow = el.querySelector('.sidebar-arrow');
    const isOpen = submenu.style.display !== 'none';
    submenu.style.display = isOpen ? 'none' : 'block';
    arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';

    if (!isOpen) {
        setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
    }
}

function scrollToCmd(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function changelog() {
    const content = `
        <div class="doc-layout-presen">
            <div class="doc-content">
                <section class="doc-section" id="changelog">
                    <div class="section-header">
                        <span class="section-num">03 —</span>
                        <h2 class="section-title">Changelog</h2>
                    </div>
                    <div class="changelog">
                        <div class="changelog-item">
                            <div class="changelog-header" onclick="toggleChangelog(this)">
                                <div class="changelog-version">v1.0.4</div>
                                <div class="changelog-date">2025</div>
                                <span class="changelog-tag tag-current">ACTUELLE</span>
                            </div>
                            <div class="changelog-body">
                                <div class="changelog-entry"><span class="entry-icon">✦</span> Nouvelle commande <span class="inline-code">/premier supJoueur</span> — exclure un joueur de l'équipe</div>
                                <div class="changelog-entry"><span class="entry-icon">✦</span> Nouvelle commande <span class="inline-code">/premier cancelEvent</span> — annulation d'un événement planifié</div>
                            </div>
                        </div>
                        <div class="changelog-item">
                            <div class="changelog-header" onclick="toggleChangelog(this)">
                                <div class="changelog-version">v1.0.3</div>
                                <div class="changelog-date">2025</div>
                                <span class="changelog-tag tag-old">ARCHIVÉE</span>
                            </div>
                            <div class="changelog-body" style="display:none">
                                <div class="changelog-entry"><span class="entry-icon">✦</span> Migration complète vers les Slash Commands natives Discord</div>
                                <div class="changelog-entry"><span class="entry-icon">✦</span> Système d'autocomplétion dynamique sur <span class="inline-code">/valorant rank</span> et <span class="inline-code">/valorant stats</span></div>
                                <div class="changelog-entry"><span class="entry-icon">✦</span> Nouvelle commande <span class="inline-code">/premier inviteJoueur</span> — invitation simultanée jusqu'à 6 joueurs</div>
                            </div>
                        </div>
                        <div class="changelog-item">
                            <div class="changelog-header" onclick="toggleChangelog(this)">
                                <div class="changelog-version">v1.0.2</div>
                                <div class="changelog-date">2025</div>
                                <span class="changelog-tag tag-old">ARCHIVÉE</span>
                            </div>
                            <div class="changelog-body" style="display:none">
                                <div class="changelog-entry"><span class="entry-icon">✦</span> Nouvelle commande <span class="inline-code">/premier créerTeam</span> — création d'équipe avec capitaine automatique</div>
                                <div class="changelog-entry"><span class="entry-icon">✦</span> Nouvelle commande <span class="inline-code">/premier inviteJoueur</span> — invitations en DM avec boutons Accepter/Refuser</div>
                                <div class="changelog-entry"><span class="entry-icon">✦</span> Nouvelle commande <span class="inline-code">!premier supTeam</span> — dissolution d'équipe par le capitaine</div>
                            </div>
                        </div>
                    </div>
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
        main.style.opacity   = '1';
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