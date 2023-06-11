<?php
function crear($usuario, $nombre, $password_user)
{
    require_once("./config.php");

    $conn = new mysqli($host, $user, $password, $bbdd);
    $consulta_prep = $conn->prepare("INSERT INTO `usuario` (`user_name`, `name`, `password`) VALUES (?, ?, MD5(?));");
    if (!$consulta_prep) {
        die("Select incorrecto");
    }
    $creado = false;
    $mensaje = '';
    $consulta_prep->bind_param("sss", $usuario, $nombre, $password_user);
    try {
        $consulta_prep->execute();
        if ($consulta_prep->affected_rows) {
            $creado = true;
        }
    } catch (Exception $e) {
        $mensaje = $e->getMessage();
    }
    $conn->close();
    $devolver = [
        'created' => $creado,
        'error' => $mensaje
    ];
    return $devolver;
}

?>