<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $ok): never {
    http_response_code($status);
    echo json_encode(['ok' => $ok], JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ['https://temelcidentist.com', 'https://www.temelcidentist.com'], true)) {
    respond(403, false);
}

$contentType = strtolower($_SERVER['CONTENT_TYPE'] ?? '');
if (!str_starts_with($contentType, 'application/json')) {
    respond(415, false);
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 12000) {
    respond(413, false);
}

try {
    $data = json_decode($raw, true, 16, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond(400, false);
}

if (!is_array($data)) {
    respond(400, false);
}

// Honeypot fields are accepted silently so automated senders do not learn the rule.
if (trim((string)($data['website'] ?? '')) !== '') {
    respond(200, true);
}

$startedAt = filter_var($data['startedAt'] ?? null, FILTER_VALIDATE_INT);
$nowMs = (int) round(microtime(true) * 1000);
if (!$startedAt || $startedAt > $nowMs || ($nowMs - $startedAt) < 1500) {
    respond(429, false);
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$lang = preg_replace('/[^a-z-]/i', '', (string)($data['lang'] ?? 'en')) ?: 'en';

if (
    mb_strlen($name) < 2 || mb_strlen($name) > 200 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 255 ||
    mb_strlen($phone) > 50 ||
    mb_strlen($message) < 5 || mb_strlen($message) > 5000 ||
    preg_match('/[\r\n]/', $email)
) {
    respond(422, false);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/temelci-contact-' . hash('sha256', $ip);
$lastSent = is_file($rateFile) ? (int) file_get_contents($rateFile) : 0;
if ($lastSent > 0 && (time() - $lastSent) < 30) {
    respond(429, false);
}

$safeName = preg_replace('/[\r\n]+/', ' ', $name);
$subjectText = 'Temelci Dental website enquiry - ' . $safeName;
$subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';
$body = implode("\r\n", [
    'New contact form enquiry',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Phone: ' . ($phone !== '' ? $phone : 'Not provided'),
    'Language: ' . $lang,
    '',
    'Message:',
    $message,
    '',
    'Submitted: ' . gmdate('Y-m-d H:i:s') . ' UTC',
]);

$headers = [
    'From: Temelci Dental Website <info@temelcidentist.com>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: TemelciDental-ContactForm',
];

$sent = mail(
    'info@temelcidentist.com, cypdentalinfo@gmail.com',
    $subject,
    $body,
    implode("\r\n", $headers)
);

if (!$sent) {
    error_log('Temelci contact form: PHP mail() returned false');
    respond(502, false);
}

file_put_contents($rateFile, (string) time(), LOCK_EX);
respond(200, true);
