var database = require("../database/config");

// Função para cadastrar um novo usuário
function cadastrar(nome, email, senha, cpf, dtNasc) {
  return database.executar(`
    INSERT INTO usuario (nome, email, senha, cpf, dataNascimento)
    VALUES ('${nome}', '${email}', '${senha}', '${cpf}', '${dtNasc}')
  `);
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

// Função para autenticar um usuário
function autenticar(cpf, senha) {
  return database.executar(`
    SELECT * FROM usuario WHERE cpf = '${cpf}' AND senha = '${senha}'
  `);
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function transferencia(idOrigem, cpfDestino, valor, dataTransferencia) {
  return database.executar(`
    INSERT INTO transferencia (idUsuarioOrigem, cpfUsuarioDestino, valor, dataTransferencia)
    VALUES ('${idOrigem}', '${cpfDestino}', '${valor}', '${dataTransferencia}')
  `);
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

//Atualizando o saldo do usuário de origem
function atualizarSaldoOrigem(idOrigem, valor) {
  return database.executar(`
    UPDATE usuario SET saldo = saldo - '${valor}' WHERE idUsuario = '${idOrigem}'
  `);
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function atualizarSaldoDestino(cpfDestino, valor) {
  return database.executar(`
    UPDATE usuario SET saldo = saldo + '${valor}' WHERE cpf = '${cpfDestino}'
  `);
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function consultarSaldo(idUsuario) {
  return database.executar(`
    SELECT saldo FROM usuario WHERE idUsuario = '${idUsuario}'
  `);
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

// Exportando as funções
module.exports = {
  cadastrar,
  autenticar,
  transferencia,
  atualizarSaldoOrigem,
  atualizarSaldoDestino,
  consultarSaldo,
};
