<?php
function update($id, $name, $userName, $image)
{
    require_once("./config.php");

    $mysqli = new mysqli($host, $user, $password, $bbdd);
    if ($mysqli->connect_errno) {
        exit();
    }

    // Verificar si el nuevo nombre de usuario ya existe
    $checkQuery = "SELECT COUNT(*) as count FROM usuario WHERE user_name = ?";
    $checkStatement = $mysqli->prepare($checkQuery);
    $checkStatement->bind_param("s", $userName);
    $checkStatement->execute();
    $checkResult = $checkStatement->get_result();
    $row = $checkResult->fetch_assoc();
    $existingUserCount = $row['count'];

    // Si ya existe un usuario con el mismo nombre, devuelve el resultado sin realizar la actualización
    if ($existingUserCount > 0) {
        $devolver = [
            'modificado' => false
        ];
        $checkStatement->close();
        $mysqli->close();
        return $devolver;
    }

    // Utilizar una consulta preparada
    $sql = "UPDATE usuario SET user_name = ?, name = ?, profile_img = ? WHERE id = ?";
    $statement = $mysqli->prepare($sql);
    $statement->bind_param("sssi", $userName, $name, $image, $id);
    $result = $statement->execute();

    require_once("./clases.php");
    $modificado;
    $usuario_obj = new Usuario();

    if ($result) {
        $modificado = true;
    } else {
        $modificado = false;
    }

    $devolver = [
        'modificado' => $modificado
    ];

    $checkStatement->close();
    $statement->close();
    $mysqli->close();

    return $devolver;
}
?>
