<?php
// Détection de l'environnement
$is_local = ($_SERVER['REMOTE_ADDR'] == '127.0.0.1' || $_SERVER['HTTP_HOST'] == 'localhost');

if ($is_local) {
    // Configuration pour ton PC (Développement)
    define('DB_HOST', 'localhost'); // Ou l'IP du serveur si tu te connectes à distance
    define('DB_NAME', 'gigabot_dev');
    define('DB_USER', 'root');
    define('DB_PASS', '');
} else {
    // Configuration pour le Serveur Dell (Production)
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'gigabot_prod');
    define('DB_USER', 'admin_bot');
    define('DB_PASS', 'ton_password_securise');
}

try {
    $db = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8", DB_USER, DB_PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die('Erreur de connexion : ' . $e->getMessage());
}
?>