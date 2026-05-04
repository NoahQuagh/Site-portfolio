<?php require_once '../../includes/guard.php'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio — Administration</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
        rel="stylesheet">
  <link rel="icon" type="image/x-icon" href="../icon/gigabot.ico">

  <link rel="stylesheet" href="../style/stylePalette.css">
  <link rel="stylesheet" href="../style/StyleHeaderSidebar.css">
  <link rel="stylesheet" href="../style/styleAdmin.css">
  <link rel="stylesheet" href="../style/styleAdmin.css">

  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=menu"/>
<body>

<header>
  <div class="header-inner">
    <div class="header-brand">
      <ul class="header-nav">
        <li>
          <img src="../img/menu.svg" alt="menu" id="menu" onclick="toggleMenu()">
          <span class="doc-hero-title-header">Giga<em>Doc</em></span>
        </li>
      </ul>
    </div>
  </div>
</header>

<aside id="sidebar">
  <div>
    <nav>
      <div class="dropdown">
        <div class="dropdown-trigger" onclick="">
          <div class="iconmenu"><img src="../img/house.svg" alt="commande"></div>
          <a>Accueil</a>
        </div>
      </div>
      <div class="dropdown" id="dd-commande">
        <div class="dropdown-trigger" onclick="toggleDd('dd-commande')">
          <div class="iconmenu"><img src="../img/robot.svg" alt="commande"></div>
          <a>GigaBot</a>
        </div>
        <ul class="dd-menu">
          <li onclick=""><a>Vue d'ensemble</a></li>
          <li onclick=""><a>Changelogs</a></li>
          <li onclick=""><a>Commandes</a></li>
          <li onclick=""><a>Report</a></li>
          <li onclick=""><a>Contributeurs</a></li>
          <li onclick=""><a>Équipes Premier</a></li>
          <li onclick=""><a>Comptes</a></li>
          <li onclick=""><a>Logs</a></li>
        </ul>
      </div>
      <div class="dropdown" id="dd-commande2">
        <div class="dropdown-trigger" onclick="toggleDd('dd-commande2')">
          <div class="iconmenu"><img src="../img/images.svg" alt="commande"></div>
          <a>Portfolio</a>
        </div>
        <ul class="dd-menu">
          <li onclick=""><a>Vide</a></li>

        </ul>
      </div>
    </nav>
  </div>
</aside>

<main>
</main>

<footer>
  <p>&lt; &copy; 2025 Portfolio de Noah Quaghebeur | Développeur Web. Tous droits réservés. |
    <a href="#">Plan du site</a> | <a href="#">Mentions légales</a> | <a href="#">Politique de confidentialité</a> &gt;
  </p>
</footer>

<script src="../../public/script/sidebar.js"></script>
<script src="../../public/script/theme.js"></script>
<script src="../../public/script/admin.js"></script>

</body>
</html>