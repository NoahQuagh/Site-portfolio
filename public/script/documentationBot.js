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

    // Phase 1 : fondu sortant
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    element.style.opacity = '0';
    element.style.transform = 'translateY(12px)';

    setTimeout(() => {
        element.innerHTML = newContent;

        // Forcer un reflow avant d'animer l'entrée
        void element.offsetHeight;

        // Phase 2 : fondu entrant
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';

        // Réactiver la sidebar scroll-spy après injection
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
   CONTENU PRINCIPAL
───────────────────────────────────────── */
function demarage() {
    const content = `
      
      <!-- SECTION DÉMARRAGE -->
      <div class="doc-layout-presen">
      <div class="doc-content">
        <section class="doc-section" id="start">
          <div class="section-header">
            <span class="section-num">01 —</span>
            <h2 class="section-title">Présentation</h2>
          </div>
          <div class="steps">
            <div class="step-card">
              <div class="step-num">01</div>
              <div>
                <div class="step-title">Inviter le bot sur votre serveur</div>
                <div class="step-desc">Utilisez le lien d'invitation OAuth2 avec les scopes <span class="inline-code">bot</span> et <span class="inline-code">applications.commands</span>. Le bot nécessite les permissions <em>Envoyer des messages</em>, <em>Lire les messages</em> et <em>Envoyer des messages en DM</em>.</div>
              </div>
            </div>
            <div class="step-card">
              <div class="step-num">02</div>
              <div>
                <div class="step-title">Activer le mode développeur Discord</div>
                <div class="step-desc">Paramètres → Avancé → <em>Mode développeur</em>. Cela vous permettra de copier des IDs si nécessaire pour configurer certaines fonctionnalités.</div>
              </div>
            </div>
            <div class="step-card">
              <div class="step-num">03</div>
              <div>
                <div class="step-title">Utiliser les slash commands</div>
                <div class="step-desc">Tapez <span class="inline-code">/</span> dans n'importe quel salon pour voir la liste des commandes disponibles. Discord propose l'autocomplétion sur les noms et les options.</div>
              </div>
            </div>
            <div class="step-card">
              <div class="step-num">04</div>
              <div>
                <div class="step-title">Créer votre équipe Premier</div>
                <div class="step-desc">Commencez par <span class="inline-code">/premier créerTeam nom:NomEquipe</span> pour enregistrer votre équipe dont vous serez automatiquement le capitaine. Invitez ensuite vos coéquipiers avec <span class="inline-code">/premier inviteJoueur</span>.</div>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
    
    `;

    changeContent('doc-content', content);
}

function commandeBot() {
    const content = `
      <!-- SIDEBAR -->
      <div class="doc-layoutCommande">
      <aside class="doc-sidebar">
        <div class="sidebar-label">// navigation</div>
        <ul class="sidebar-nav">
          <li><a href="#start" class="active">\\DÉMARRAGE</a></li>
          <li><a href="#commands" class="sub">\\COMMANDES</a></li>
          <li><a href="#premier" class="sub">→ /premier</a></li>
          <li><a href="#valorant" class="sub">→ /valorant</a></li>
          <li><a href="#bot" class="sub">→ /bot</a></li>
          <li><a href="#help" class="sub">→ /help</a></li>
          <li><a href="#log" class="sub">→ /log</a></li>
          <li><a href="#man" class="sub">→ /man</a></li>
          <li><a href="#nouveaute" class="sub">→ /nouveauté</a></li>
          <li><a href="#changelog">\\CHANGELOG</a></li>
        </ul>
      </aside>

      <div class="doc-content">

        <!-- SECTION COMMANDES -->
        <section class="doc-section" id="commands">
          <div class="section-header">
            <span class="section-num">02 —</span>
            <h2 class="section-title">Commandes</h2>
          </div>

          <div class="cmd-group">
            <div class="cmd-group-label" id="premier">/premier — Mode Premier Valorant</div>

            <div class="cmd-card" onclick="toggleCmd(this)">
              <div class="cmd-header">
                <div class="cmd-header-left">
                  <span class="cmd-name">/premier event</span>
                  <span class="cmd-desc">Créer un événement de game Premier et envoyer des invitations</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="cmd-badge badge-slash">SLASH</span>
                  <span class="cmd-toggle">▾</span>
                </div>
              </div>
              <div class="cmd-body">
                <div class="cmd-usage">/premier event &lt;jj&gt; &lt;mm&gt; &lt;aaaa&gt; &lt;hh&gt; &lt;mm&gt;</div>
                <ul class="cmd-args">
                  <li><span class="arg-name">jour</span><span class="arg-req req">requis</span> Jour du match (format jj)</li>
                  <li><span class="arg-name">mois</span><span class="arg-req req">requis</span> Mois du match (format mm)</li>
                  <li><span class="arg-name">année</span><span class="arg-req req">requis</span> Année du match (format aaaa)</li>
                  <li><span class="arg-name">heure</span><span class="arg-req req">requis</span> Heure du match (format hh)</li>
                  <li><span class="arg-name">minute</span><span class="arg-req req">requis</span> Minute du match (format mm)</li>
                </ul>
                <div class="cmd-example">→ Envoie une invitation DM à tous les membres de votre équipe avec boutons Participer / Refuser. Un rappel automatique est envoyé 30min avant le match.</div>
              </div>
            </div>

            <div class="cmd-card" onclick="toggleCmd(this)">
              <div class="cmd-header">
                <div class="cmd-header-left">
                  <span class="cmd-name">/premier créerTeam</span>
                  <span class="cmd-desc">Créer sa team Premier et en devenir capitaine</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="cmd-badge badge-slash">SLASH</span>
                  <span class="cmd-toggle">▾</span>
                </div>
              </div>
              <div class="cmd-body">
                <div class="cmd-usage">/premier créerTeam nom:&lt;nomEquipe&gt;</div>
                <ul class="cmd-args">
                  <li><span class="arg-name">nom</span><span class="arg-req req">requis</span> Nom unique de l'équipe Premier</li>
                </ul>
                <div class="cmd-example">→ Vous devenez automatiquement capitaine. Un seul joueur peut être capitaine. Le nom d'équipe doit être unique.</div>
              </div>
            </div>

            <div class="cmd-card" onclick="toggleCmd(this)">
              <div class="cmd-header">
                <div class="cmd-header-left">
                  <span class="cmd-name">/premier inviteJoueur</span>
                  <span class="cmd-desc">Inviter jusqu'à 6 joueurs dans sa team</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="cmd-badge badge-slash">SLASH</span>
                  <span class="cmd-toggle">▾</span>
                </div>
              </div>
              <div class="cmd-body">
                <div class="cmd-usage">/premier inviteJoueur joueur1:@user [joueur2..6]</div>
                <ul class="cmd-args">
                  <li><span class="arg-name">joueur1</span><span class="arg-req req">requis</span> Premier joueur à inviter (mention)</li>
                  <li><span class="arg-name">joueur2–6</span><span class="arg-req opt">optionnel</span> Joueurs supplémentaires (jusqu'à 6 au total)</li>
                </ul>
                <div class="cmd-example">→ Chaque joueur reçoit une invitation en DM. Réservé au capitaine. Maximum 7 joueurs par équipe.</div>
              </div>
            </div>

            <div class="cmd-card" onclick="toggleCmd(this)">
              <div class="cmd-header">
                <div class="cmd-header-left">
                  <span class="cmd-name">/premier supTeam</span>
                  <span class="cmd-desc">Dissoudre son équipe Premier</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="cmd-badge badge-slash">SLASH</span>
                  <span class="cmd-toggle">▾</span>
                </div>
              </div>
              <div class="cmd-body">
                <div class="cmd-usage">/premier supTeam</div>
                <ul class="cmd-args">
                  <li><span class="arg-name">—</span><span class="arg-req opt">aucun arg</span> Commande sans paramètres</li>
                </ul>
                <div class="cmd-example">→ Supprime définitivement l'équipe. Le nom et les joueurs sont libérés. Réservé au capitaine.</div>
              </div>
            </div>

            <div class="cmd-card" onclick="toggleCmd(this)">
              <div class="cmd-header">
                <div class="cmd-header-left">
                  <span class="cmd-name">/premier supJoueur</span>
                  <span class="cmd-desc">Exclure un joueur de l'équipe</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="cmd-badge badge-slash">SLASH</span>
                  <span class="cmd-toggle">▾</span>
                </div>
              </div>
              <div class="cmd-body">
                <div class="cmd-usage">/premier supJoueur joueur:@user</div>
                <ul class="cmd-args">
                  <li><span class="arg-name">joueur</span><span class="arg-req req">requis</span> Joueur à exclure (mention)</li>
                </ul>
                <div class="cmd-example">→ Réservé au capitaine. Le joueur est retiré de l'équipe immédiatement.</div>
              </div>
            </div>

            <div class="cmd-card" onclick="toggleCmd(this)">
              <div class="cmd-header">
                <div class="cmd-header-left">
                  <span class="cmd-name">/premier cancelEvent</span>
                  <span class="cmd-desc">Annuler un événement de game planifié</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="cmd-badge badge-slash">SLASH</span>
                  <span class="cmd-toggle">▾</span>
                </div>
              </div>
              <div class="cmd-body">
                <div class="cmd-usage">/premier cancelEvent jour:&lt;jj&gt; mois:&lt;mm&gt; année:&lt;aaaa&gt; heure:&lt;hh&gt; minute:&lt;mm&gt;</div>
                <ul class="cmd-args">
                  <li><span class="arg-name">jour/mois/année</span><span class="arg-req req">requis</span> Date de l'événement à annuler</li>
                  <li><span class="arg-name">heure/minute</span><span class="arg-req req">requis</span> Heure de l'événement à annuler</li>
                </ul>
                <div class="cmd-example">→ Supprime le rappel planifié. Les joueurs ne recevront plus de notification.</div>
              </div>
            </div>
          </div>

          <div class="cmd-group">
            <div class="cmd-group-label" id="valorant">/valorant — Commande relative au jeu Valorant</div>

            <div class="cmd-card" onclick="toggleCmd(this)">
              <div class="cmd-header">
                <div class="cmd-header-left">
                  <span class="cmd-name">/valorant rank</span>
                  <span class="cmd-desc">Obtenir le rang actuel d'un joueur</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="cmd-badge badge-slash">SLASH</span>
                  <span class="cmd-toggle">▾</span>
                </div>
              </div>
              <div class="cmd-body">
                <div class="cmd-usage">/valorant rank pseudotag:&lt;Pseudo#Tag&gt;</div>
                <ul class="cmd-args">
                  <li><span class="arg-name">pseudotag</span><span class="arg-req req">requis</span> Pseudo et tag Valorant (ex: TenZ#NA1) — autocomplétion disponible</li>
                </ul>
                <div class="cmd-example">→ <span>Astuce :</span> l'autocomplétion propose les pseudos déjà recherchés. Tapez quelques lettres pour filtrer.</div>
              </div>
            </div>

            <div class="cmd-card" onclick="toggleCmd(this)">
              <div class="cmd-header">
                <div class="cmd-header-left">
                  <span class="cmd-name">/valorant stats</span>
                  <span class="cmd-desc">Obtenir les statistiques détaillées d'un joueur</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="cmd-badge badge-slash">SLASH</span>
                  <span class="cmd-toggle">▾</span>
                </div>
              </div>
              <div class="cmd-body">
                <div class="cmd-usage">/valorant stats pseudotag:&lt;Pseudo#Tag&gt;</div>
                <ul class="cmd-args">
                  <li><span class="arg-name">pseudotag</span><span class="arg-req req">requis</span> Pseudo et tag Valorant (ex: Shroud#NA1) — autocomplétion disponible</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="cmd-group">
            <div class="cmd-group-label">// Utilitaires</div>

            <div class="cmd-card" onclick="toggleCmd(this)">
              <div class="cmd-header">
                <div class="cmd-header-left">
                  <span class="cmd-name" id="bot">/bot</span>
                  <span class="cmd-desc">Affiche les informations sur le bot</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="cmd-badge badge-slash">SLASH</span>
                  <span class="cmd-toggle">▾</span>
                </div>
              </div>
              <div class="cmd-body">
                <div class="cmd-usage">/bot</div>
                <div class="cmd-example">→ Version, uptime, développeur et informations techniques du bot.</div>
              </div>
            </div>

            <div class="cmd-card" onclick="toggleCmd(this)">
              <div class="cmd-header">
                <div class="cmd-header-left">
                  <span class="cmd-name" id="help">/help</span>
                  <span class="cmd-desc">Liste des commandes disponibles</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="cmd-badge badge-slash">SLASH</span>
                  <span class="cmd-toggle">▾</span>
                </div>
              </div>
              <div class="cmd-body">
                <div class="cmd-usage">/help [option:all]</div>
                <ul class="cmd-args">
                  <li><span class="arg-name">option</span><span class="arg-req opt">optionnel</span> <span class="inline-code">all</span> pour lister toutes les commandes</li>
                </ul>
              </div>
            </div>

            <div class="cmd-card" onclick="toggleCmd(this)">
              <div class="cmd-header">
                <div class="cmd-header-left">
                  <span class="cmd-name" id="man">/man</span>
                  <span class="cmd-desc">Manuel détaillé d'une commande spécifique</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="cmd-badge badge-slash">SLASH</span>
                  <span class="cmd-toggle">▾</span>
                </div>
              </div>
              <div class="cmd-body">
                <div class="cmd-usage">/man commande:&lt;nomCommande&gt;</div>
                <ul class="cmd-args">
                  <li><span class="arg-name">commande</span><span class="arg-req req">requis</span> Nom de la commande dont vous voulez le manuel</li>
                </ul>
              </div>
            </div>

            <div class="cmd-card" onclick="toggleCmd(this)">
              <div class="cmd-header">
                <div class="cmd-header-left">
                  <span class="cmd-name" id="nouveaute">/nouveauté</span>
                  <span class="cmd-desc">Voir les nouveautés et mises à jour du bot</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="cmd-badge badge-slash">SLASH</span>
                  <span class="cmd-toggle">▾</span>
                </div>
              </div>
              <div class="cmd-body">
                <div class="cmd-usage">/nouveauté [version:&lt;x.x.x&gt;]</div>
                <ul class="cmd-args">
                  <li><span class="arg-name">version</span><span class="arg-req opt">optionnel</span> Version spécifique (ex: 1.0.3). Sans argument : dernière version.</li>
                </ul>
              </div>
            </div>

            <div class="cmd-card" onclick="toggleCmd(this)">
              <div class="cmd-header">
                <div class="cmd-header-left">
                  <span class="cmd-name" id="log">/log</span>
                  <span class="cmd-desc">Récupérer le fichier de logs du bot</span>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="cmd-badge badge-admin">ADMIN</span>
                  <span class="cmd-badge badge-slash">SLASH</span>
                  <span class="cmd-toggle">▾</span>
                </div>
              </div>
              <div class="cmd-body">
                <div class="cmd-usage">/log</div>
                <div class="cmd-example">→ Réservé au propriétaire du bot. Envoie le fichier <span class="inline-code">logs.txt</span> en pièce jointe dans le salon.</div>
              </div>
            </div>
          </div>
        </section>

      </div>
      </div>

    `;

    changeContent('doc-content', content);
}

function changelog() {
    const content = `
      <div class="doc-layout-presen">
      <div class="doc-content">
        <!-- SECTION CHANGELOG -->
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
      </div>
    `;

    changeContent('doc-content', content);
}

/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    // État initial : opacity 0 pour que le fondu ait un point de départ visible
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