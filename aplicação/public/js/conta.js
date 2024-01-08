class Cliente{
    email = sessionStorage.EMAIL_USUARIO;
    nome = sessionStorage.NOME_USUARIO;
    id = sessionStorage.ID_USUARIO;
    cpf = sessionStorage.CPF_USUARIO;
    saldo = sessionStorage.SALDO_USUARIO;
    tipo = sessionStorage.TIPO_USUARIO;

    getEmail(){
        return this.email
    }

    getNome(){
        return this.nome
    }

    getId(){
        return this.id
    }

    getCpf(){
        return this.cpf
    }

    getSaldo(){
        return this.saldo
    }

    getTipo(){
        return this.tipo
    }

    setEmail(email){
        this.email = email
    }

    setNome(nome){
        this.nome = nome
    }

    setId(id){
        this.id = id
    }

    setCpf(cpf){
        this.cpf = cpf
    }

    setSaldo(saldo){
        this.saldo = saldo
    }

    setTipo(tipo){
        this.tipo = tipo
    }

    transferencia(valor, cpfDestino){
        if(consultarAutorizacao() == false){
            console.log("transferencia não realizada");
            return false
        } else {
            console.log("transferencia realizada");
            fetch(`/usuario/transferencia/${this.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cpfDestino: cpfDestino,
                    valor: valor
                })
            }).then(function (resposta) {
        
                if (resposta.ok) {
                    resposta.json().then(json => {        
                        // Atribuindo os valores do JSON para as variáveis de sessão
                        console.log(JSON.stringify(json));
                        sessionStorage.SALDO_USUARIO = json.saldo;
                    });
                } else {
                    resposta.text().then(texto => {
                        alert(texto);
                    });
                }
            })
        }
    }
}

// Função para consultar mocky de autorização de transação
function consultarAutorizacao(){
    fetch("https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc").then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                if (json.message == "Autorizado") {
                    return true;
                } else {
                    alert("Transação não autorizada!");
                    return false;
                }
            });
        } else {
            resposta.text().then(texto => {
                alert(texto);
            });
        }
    })
}

NovoCliente = new Cliente();

function teste(){
    console.log(NovoCliente.getNome())
    console.log(NovoCliente.getId())
    NovoCliente.transferencia(200, "123.456.789-14")
}

//Colocando o nome do usuário na tela
document.getElementById("nome").innerHTML = NovoCliente.getNome();
document.getElementById("saldo").innerHTML = NovoCliente.getSaldo();
// document.getElementById("cpf").innerHTML = NovoCliente.getCpf();
// document.getElementById("id").innerHTML = NovoCliente.getId();
document.getElementById("email").innerHTML = NovoCliente.getEmail();
document.getElementById("tipo").innerHTML = NovoCliente.getTipo();

