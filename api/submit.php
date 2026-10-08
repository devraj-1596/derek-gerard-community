<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
function out(int $c, array $d): void { http_response_code($c); echo json_encode($d); exit; }
function ln(string $s): int { return function_exists('mb_strlen') ? mb_strlen($s) : strlen($s); }
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { header('Allow: POST'); out(405, ['ok'=>false,'error'=>'Method not allowed.']); }
$cfgFile = __DIR__ . '/config.php';
if (!is_file($cfgFile)) out(500, ['ok'=>false,'error'=>'Server is not configured yet.']);
$cfg = require $cfgFile;
$in = stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false
    ? (json_decode((string)file_get_contents('php://input'), true) ?: []) : $_POST;
if (!empty($in['website'])) out(200, ['ok'=>true]); // honeypot: bots fill this in
$name = trim((string)($in['name'] ?? '')); $email = trim((string)($in['email'] ?? ''));
$type = trim((string)($in['type'] ?? '')); $msg = trim((string)($in['message'] ?? ''));
$types = ['Challenges','Food challenges','That Library Show interviews','Other'];
$e = [];
if (ln($name) < 2 || ln($name) > 80) $e['name'] = 'Enter your name (2-80 characters).';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || ln($email) > 120) $e['email'] = 'Enter a valid email address.';
if (!in_array($type, $types, true)) $e['type'] = 'Pick one of the listed types.';
if (ln($msg) < 10 || ln($msg) > 2000) $e['message'] = 'Message must be 10-2000 characters.';
if ($e) out(422, ['ok'=>false,'error'=>'Please fix the highlighted fields.','errors'=>$e]);
try {
    $sqlite = ($cfg['driver'] ?? 'mysql') === 'sqlite';
    $pdo = $sqlite
        ? new PDO('sqlite:' . $cfg['sqlite_path'])
        : new PDO("mysql:host={$cfg['host']};dbname={$cfg['name']};charset=utf8mb4", $cfg['user'], $cfg['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec($sqlite
        ? 'CREATE TABLE IF NOT EXISTS submissions (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, video_type TEXT, message TEXT, ip TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)'
        : 'CREATE TABLE IF NOT EXISTS submissions (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(80) NOT NULL, email VARCHAR(120) NOT NULL, video_type VARCHAR(40) NOT NULL, message TEXT NOT NULL, ip VARCHAR(45), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) CHARACTER SET utf8mb4');
    $pdo->prepare('INSERT INTO submissions (name,email,video_type,message,ip) VALUES (?,?,?,?,?)')
        ->execute([$name, $email, $type, $msg, $_SERVER['REMOTE_ADDR'] ?? null]);
    out(201, ['ok'=>true]);
} catch (Throwable $ex) {
    error_log('submit.php: ' . $ex->getMessage());
    out(500, ['ok'=>false,'error'=>'Could not save your submission. Please try again later.']);
}
