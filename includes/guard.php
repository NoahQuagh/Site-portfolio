<?php
session_start();

if (
    !isset($_SESSION['logged_in']) ||
    $_SESSION['logged_in'] !== true ||
    $_SESSION['role'] !== 'admin'
) {
    header('Location: /public/page/login.html');
    exit;
}