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
        if(this.saldo < valor && !consultarAutorizacao()){
            return false
        } else {
            fetch("/usuario/transferencia", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idOrigem: this.id,
                    idDestino: cpfDestino,
                    valor: valor
                })
            }).then(function (resposta) {
        
                if (resposta.ok) {
                    console.log(resposta);
        
                    resposta.json().then(json => {
                        console.log(json);
        
                        // Atribuindo os valores do JSON para as variáveis de sessão
                        console.log(JSON.stringify(json));
                        sessionStorage.SALDO_USUARIO = json.saldo;
        
                    });
        
                } else {
                    console.log("Houve um erro ao tentar realizar a transferencia!");
                    resposta.text().then(texto => {
                        alert(texto);
                    });
                }
            })
        }
    }
}

// Função para consultar mocky de autorização de transação
const consultarAutorizacao = () => {
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



//chamadndo a função de consultar autorização se botão for clicado
const btnTransferir = document.getElementById("btnTransferir");
btnTransferir.addEventListener("click", consultarAutorizacao);
