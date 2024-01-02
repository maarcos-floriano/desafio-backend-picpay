// Funções de abrir e fechar o modal
// buscamos pelo id do modal e alteramos o display
function mostrarModal(){
    document.getElementById('modal').style.display = 'block';
}
function fecharModal(){
    document.getElementById('modal').style.display = 'none';
}

function printar(){
    window.print('Ola mundo');
}