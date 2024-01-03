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

// Exportando as funções
module.exports = {
  cadastrar,
  autenticar,
};
