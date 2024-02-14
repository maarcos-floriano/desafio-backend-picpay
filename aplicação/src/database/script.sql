DROP DATABASE IF EXISTS PicPay;

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
    tipo VARCHAR(255) NOT NULL
);

CREATE TABLE transferencia (
    idTransferencia INT PRIMARY KEY AUTO_INCREMENT,
    idUsuarioOrigem INT NOT NULL,
    cpfUsuarioDestino VARCHAR(255) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    dataTransferencia DATETIME NOT NULL
);

INSERT INTO usuario (nome, senha, email, cpf, dataNascimento, saldo, tipo) VALUES
('João', '123', 'joao@gmail.com', '123.456.789-11', '1990-01-01', 1000.00, 'COMUM'),
('Maria', '123', 'maria@gmail.com', '123.456.789-12', '1990-01-01', 1000.00, 'COMUM'),
('Lojista1', '123', 'lojista1@gmail.com', '123.456.789-13', '1990-01-01', 1000.00, 'LOJISTA'),
('Lojista2', '123', 'lojista2@gmail.com', '123.456.789-14', '1990-01-01', 1000.00, 'LOJISTA');

