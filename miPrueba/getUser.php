<?php
function recuperar($password_user, $usuario)
{
    require_once("./config.php");

    $mysqli = new mysqli($host, $user, $password, $bbdd);
    if ($mysqli->connect_errno) {
        exit();
    }

    $sql = "SELECT * FROM usuario WHERE password = ? AND user_name = ?";
    $stmt = $mysqli->prepare($sql);

    $hashed_password = md5($password_user); 

    $stmt->bind_param("ss", $hashed_password, $usuario);
    $stmt->execute();

    require_once("./clases.php");
    $result = $stmt->get_result();
    
    $existe;
    $usuario_obj = new Usuario();
    
    if ($result->num_rows == 0) {
        $stmt->close();
        $mysqli->close();
        $existe = false;
    } else {
        while ($value = $result->fetch_assoc()) {
            foreach ($value as $campo => $valor) {
                switch ($campo) {
                    case 'user_name':
                        $usuario_obj->setUsuario($valor);
                        break;
                    case 'name':
                        $usuario_obj->setNombre($valor);
                        break;
                    case 'id':
                        $usuario_obj->setId($valor);
                        break;
                    case 'profile_img':
                        $usuario_obj->setProfilePhoto($valor);
                        break;
                }
            }
        }
        $existe = true;
    }
    
    $devolver = [
        'existe' => $existe,
        'usuario' => [
            'id' => $usuario_obj->getId(),
            'name' => $usuario_obj->getNombre(),
            'profilePhoto' => $usuario_obj->getProfilePhoto(),
            'user_name' => $usuario_obj->getUsuario()
        ]
    ];

    return $devolver;
}
?>
