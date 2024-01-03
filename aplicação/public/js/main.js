// Funções de abrir e fechar o modal
// buscamos pelo id do modal e alteramos o display
function mostrarModal() {
  document.getElementById("modal").style.display = "block";
}
function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

// funcao para abrir e fechar modal login
function mostrarModalLogin() {
  document.getElementById("modalLogin").style.display = "block";
  console.log("teste");
}
function fecharModalLogin() {
  document.getElementById("modalLogin").style.display = "none";
}

// Validar e-mail
function validarEmail(email) {
  // Regex para validar e-mail
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // caso precise estilizar o input
  // const emailStyle = document.getElementById("ipt_email");

  if (!regexEmail.test(email)) {
    console.log("email invalido");
    // emailStyle.style.border = "1px solid red";
    return false;
  } else {
    console.log("email valido");
    return true;
  }
}

// Validar senha
function validarSenha(senha, confirmSenha) {
  // const senhaStyle = document.getElementById("ipt_senha");

  // Regex para validar senha forte, 8 caracteres, maiusculo, minusculo, numero e caracter especial
  if (
    senha.length < 8 ||
    !/[A-Z]/.test(senha) ||
    !/[a-z]/.test(senha) ||
    !/[0-9]/.test(senha) ||
    !/[$@$!%*?&]/.test(senha)
  ) {
    alert("Senha fraca");
    //   senhaStyle.style.borderBottom = "2px solid red";
    return false;
  } else if (senha !== confirmSenha) {
    alert("As senhas não coincidem.");
    return false;
  } else {
    //   senhaStyle.style.borderBottom = "1px solid black";
    return true;
  }
}

// Validar CPF
function validarCPF(cpf) {
  // const cpfStyle = document.getElementById("ipt_cpf");

  // Regex para validar CPF
  const regexCPF = /(?:\d{3}[-.\s]?){3}\d{2}/;

  if (!regexCPF.test(cpf)) {
    alert("CPF inválido");
    //   cpfStyle.style.borderBottom = "2px solid red";
    return false;
  } else {
    //   cpfStyle.style.borderBottom = "1px solid black";
    return true;
  }
}

//Validar nome não estamos usando mas caso vc queira usar
function validarNome(nome) {
  //   const nomeStyle = document.getElementById("ipt_nome");
  if (nome.trim() === "") {
    // nomeStyle.style.borderBottom = "2px solid red";]
    alert("Nome inválido");
    return false;
  } else {
    // nomeStyle.style.borderBottom = "1px solid black";
    return true;
  }
}

//Validar idade
function validarIdade(dtNasc) {
    var dataNascimento = new Date(dtNasc);
    var hoje = new Date();
    var idade = hoje.getFullYear() - dataNascimento.getFullYear();
    var mes = hoje.getMonth() - dataNascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    if (idade < 18) {
        alert("É necessário ter mais de 18 anos para se cadastrar.");
        return false;
    }

    return true;
}

// Enviar credencias
function enviarCredenciais() {
  var emailVar = ipt_email.value;
  var senhaVar = ipt_senha.value;
  var confirmSenhaVar = ipt_confirmSenha.value;
  var nomeVar = ipt_nome.value;
  var cpfVar = ipt_cpf.value;
  var dtNascVar = ipt_dtNasc.value;

  if (
    validarEmail(emailVar) &&
    validarSenha(senhaVar, confirmSenhaVar) &&
    validarNome(nomeVar) &&
    validarCPF(cpfVar) &&
    validarIdade(dtNascVar)
  ) {
    fetch("/usuario/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
        cpfServer: cpfVar,
        dtNascServer: dtNascVar,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          alert("Cadastro feito com sucesso, redirecionando");

          // redirecionar para a página de login
          fecharModal();
          mostrarModalLogin();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        alert(`${resposta}`);
      });

    return false;
  }
}

// Função para acessar
function acessar() {
  var cpfVar = ipt_cpf_login.value;
  var senhaVar = ipt_senha_login.value;

  if(senhaVar == "" || cpfVar == ""){
    setTimeout(() => {
      alert('Campos invalidos')
    }, 100);
    return false
  }
  fetch("/usuario/autenticar", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              cpfServer: cpfVar,
              senhaServer: senhaVar
          })
      }).then(function (resposta) {
          console.log("ESTOU NO THEN DO entrar()!")

          if (resposta.ok) {
              console.log(resposta);

              resposta.json().then(json => {
                  console.log(json);

                  // Atribuindo os valores do JSON para as variáveis de sessão
                  console.log(JSON.stringify(json));
                  sessionStorage.EMAIL_USUARIO = json.email;
                  sessionStorage.NOME_USUARIO = json.nome;
                  sessionStorage.ID_USUARIO = json.idUsuario;
                  sessionStorage.CPF_USUARIO = json.cpf;

                  setTimeout(function () {
                      window.location = "../conta.html";
                  }, 1000); // apenas para exibir o loading

              });

          } else {

              console.log("Houve um erro ao tentar realizar o login!");

              resposta.text().then(texto => {
                  alert(texto);
              });
          }

      }).catch(function (erro) {
          console.log(erro);
      })
}