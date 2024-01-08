var usuarioModel = require("../models/usuarioModel");

// Função para cadastrar um novo usuário
function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var cpf = req.body.cpfServer;
  var dtNasc = req.body.dtNascServer;

  // Faça as validações das requisições recebidas
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu registro está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (dtNasc == undefined) {
    res.status(400).send("Sua data de nascimento está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(nome, email, senha, cpf, dtNasc)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

// Função para autenticar um usuário
function autenticar(req, res) {
  var cpf = req.body.cpfServer;
  var senha = req.body.senhaServer;

  if (cpf == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .autenticar(cpf, senha)
      .then(function (resultado) {
        if (resultado.length == 1) {
          res.json({
            nome: resultado[0].nome,
            email: resultado[0].email,
            idUsuario: resultado[0].idUsuario,
            cpf: resultado[0].cpf,
            saldo: resultado[0].saldo,
            tipo: resultado[0].tipo,
          });
        } else if (resultado.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar a autenticação! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

//Aqui é onde a transferência é realizada
function transferencia(req, res) {
  var idOrigem = req.params.idUsuario;
  var cpfDestino = req.body.cpfDestino;
  var valor = req.body.valor;
  var dataTransferencia = new Date();

  //Formatando a data para o formato do MySQL
  dataTransferencia =
    dataTransferencia.getFullYear() +
    "-" +
    (dataTransferencia.getMonth() + 1) +
    "-" +
    dataTransferencia.getDate() +
    " " +
    dataTransferencia.getHours() +
    ":" +
    dataTransferencia.getMinutes() +
    ":" +
    dataTransferencia.getSeconds();

  if (idOrigem == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else if (cpfDestino == undefined) {
    res.status(400).send("Seu cpf está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.transferencia(idOrigem, cpfDestino, valor, dataTransferencia)
      .then(function () {
        usuarioModel.atualizarSaldoOrigem(idOrigem, valor)
          .then(function () {
            usuarioModel.atualizarSaldoDestino(cpfDestino, valor)
              .then(function () {
                usuarioModel.consultarSaldo(idOrigem).then(function (resultado) {
                  res.json(resultado);
                });
              });
          });
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar a autenticação! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

// Exportando as funções
module.exports = {
  cadastrar,
  autenticar,
  transferencia,
};
