CREATE DATABASE autentication;

USE autenticacion;

CREATE TABLE IF NOT EXISTS Users(
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(400) NOT NULL,
    apellido VARCHAR(400) NOT NULL,
    correo VARCHAR(400) NOT NULL,
    telefono VARCHAR(14) NOT NULL,
    direccion VARCHAR(20) NOT NULL
);