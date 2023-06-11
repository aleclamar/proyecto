<?php
// Configurar los encabezados CORS
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Obtener el contenido del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);
require_once("./updateUser.php");

$name = htmlspecialchars($data['name']);
$userName = htmlspecialchars($data['userName']);
$img = htmlspecialchars($data['img']);
$id = htmlspecialchars($data['id']);
$respuesta = update($id,$name,$userName,$img);

echo json_encode($respuesta);
?>