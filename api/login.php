<?php
session_start();
require_once '../includes/db.php'; // Vérifie bien le chemin vers ta connexion BDD

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

// Remplacement du ?? par isset pour la compatibilité ancienne version PHP
$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Identifiant et mot de passe requis']);
    exit;
}

try {
    $stmt = $db->prepare("SELECT * FROM users WHERE username = ? LIMIT 1");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Identifiant ou mot de passe incorrect']);
        exit;
    }

    if ($user['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(['error' => 'Accès réservé aux administrateurs']);
        exit;
    }

    // On remplit la session
    $_SESSION['user_id']   = $user['id'];
    $_SESSION['username']  = $user['username'];
    $_SESSION['role']      = $user['role'];
    $_SESSION['logged_in'] = true;

    // IMPORTANT : Rediriger vers admin.php (qui contient le guard) et non admin.php
    echo json_encode(['success' => true, 'redirect' => '../../public/page/admin.php']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur BDD : ' . $e->getMessage()]);
}