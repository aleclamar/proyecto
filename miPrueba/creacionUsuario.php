<?php
// Configurar los encabezados CORS
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Obtener el contenido del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);
require_once("./createUser.php");

$name = htmlspecialchars($data['name']);
$userName = htmlspecialchars($data['userName']);
$password = htmlspecialchars($data['password']);

$respuesta = crear($userName,$name,$password);
echo json_encode($respuesta);
?>