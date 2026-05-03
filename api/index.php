<?php
require_once '../includes/db.php';
/** @var PDO $db */

header('Content-Type: application/json');

$route = isset($_GET['route']) ? $_GET['route'] : null;
define('IS_API_ALLOWED', true);

try {
    switch ($route) {
        case 'stats':
            require_once 'routes/stats.php';
            break;

        case 'users':
            require_once 'routes/users.php';
            break;

        default:
            http_response_code(404);
            echo json_encode(["error" => "Route non trouvée"]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur : " . $e->getMessage()]);
}

//appelle via const stats = await fetch('/api/stats').then(res => res.json());