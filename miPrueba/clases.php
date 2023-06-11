<?php
    class Usuario{

        //PROPERTIES
        private $nombre;
        private $usuario;
        private $id;
        private $profilePhoto;

        //CONSTRUCTOR
        function __construct(){
        }

        //SET
        function setNombre($nombre){
            $this->nombre=$nombre;
        }
        function setUsuario($valor){
            $this->usuario=$valor;
        }
        function setId($valor){
            $this->id=$valor;
        }
        function setProfilePhoto($valor){
            $this->profilePhoto = $valor;
        }

        //GET
        function getNombre(){
            return $this->nombre;
        }
        function getProfilePhoto(){
            return $this->profilePhoto;
        }
        function getUsuario(){
            return $this->usuario;
        }
        function getId(){
            return $this->id;
        }
    }
?>