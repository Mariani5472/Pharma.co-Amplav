const camposDoFormulario = document.querySelectorAll("[required]");
const formularioLogin = document.querySelector("[data-formulario]");

formularioLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const email = evento.target.elements["email"].value;
    const senha = evento.target.elements["senha"].value;

    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    const usuario = cadastros.find(cadastro => cadastro.email === email);
    const mensagemErro = document.querySelector('.mensagem-erro');

    if (usuario) {
        if (usuario.senha === senha) {
            mensagemErro.textContent = ""
            localStorage.removeItem("usuarioLogado");
            localStorage.setItem("usuarioLogado", usuario.nome);
            window.location.href = "/pages/pagina-principal.html";
        } else {
            mensagemErro.textContent = "Senha incorreta. Tente novamente.";
        }
    } else {
        mensagemErro.textContent = "Email não cadastrado. Por favor, registre-se primeiro.";
    }
})