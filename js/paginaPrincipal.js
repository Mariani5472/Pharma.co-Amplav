const corpoTabela = document.querySelector('#corpoTabela');
const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

corpoTabela.innerHTML = '';

cadastros.forEach((cadastro, index) => {
    const novaRow = document.createElement('tr');
    novaRow.innerHTML += `
        <td>${index + 1}</td>
        <td>${cadastro.usuario}</td>
        <td>${cadastro.nome}</td>
        <td>${cadastro.email}</td>
    `
    //<td>${cadastro.senha}</td>
    corpoTabela.appendChild(novaRow);
});

const usuarioLogado = localStorage.getItem("usuarioLogado");
if (usuarioLogado) {
    const saudacao = document.createElement('p');
    const localSaudacao = document.querySelector('#saudacaoDiv');
    saudacao.textContent = `Olá ${usuarioLogado}, bem vindo(a) de volta!`
    localSaudacao.appendChild(saudacao);
}