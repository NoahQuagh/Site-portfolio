<?php
require_once '../includes/db.php';
/** @var PDO $db */

header('Content-Type: application/json');

if(!defined('IS_API_ALLOWED')) {
    http_response_code(403);
    die('Accès direct interdit');
}

try {
    $query = $db->query("SELECT * FROM test");
    $stats = $query->fetch(PDO::FETCH_ASSOC);

    if ($stats) {
        echo json_encode($stats);
    } else {
        echo json_encode(["error" => "Aucune donnée trouvée"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
