CREATE DATABASE PicPay;

USE PicPay;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    dataNascimento DATE NOT NULL,
    saldo DECIMAL(10,2) NOT NULL,
    tipoUsuario VARCHAR(255) NOT NULL
);

CREATE TABLE transferencia (
    idTransferencia INT PRIMARY KEY AUTO_INCREMENT,
    idUsuarioOrigem INT NOT NULL,
    cpfdUsuarioDestino INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    dataTransferencia DATE NOT NULL,
    FOREIGN KEY (idUsuarioOrigem) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idUsuarioDestino) REFERENCES usuario(idUsuario)
);