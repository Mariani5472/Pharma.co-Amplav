const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

const nomeInput = document.querySelector("#nome");
nomeInput.addEventListener("input", () => {
    const valorDigitado = nomeInput.value;
    const erroNome = document.querySelector('.mensagem-erro.nome');
    if (valorDigitado.length < 10) {
        erroNome.textContent = "Digite um nome com mais de 10 caracteres."
    } else {
        erroNome.textContent = "";
    }
})

const usuarioInput = document.querySelector("#usuario");
usuarioInput.addEventListener("input", () => {
    const valorDigitado = usuarioInput.value;
    const erroUsuario = document.querySelector('.mensagem-erro.usuario');
    if (valorDigitado.length < 5 || valorDigitado.length > 20) {
        erroUsuario.textContent = "Digite um usuario entre 5 e 20 caracteres."
    } else {
        const usuariosCadastrados = JSON.parse(localStorage.getItem("cadastros")) || [];
        const usuarioJaCadastrado = usuariosCadastrados.some(usuario => usuario.usuario === valorDigitado);
        if (usuarioJaCadastrado) {
            erroUsuario.textContent = "Este usuário já está em uso."
        } else {
            erroUsuario.textContent = "";
        }
    }
})

const emailInput = document.querySelector("#email");
emailInput.addEventListener("input", () => {
    const valorDigitado = emailInput.value;
    const erroEmail = document.querySelector('.mensagem-erro.email');
    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }
    if (validarEmail(valorDigitado)) {
        const emailsCadastrados = JSON.parse(localStorage.getItem("cadastros")) || [];
        const emailJaCadastrado = emailsCadastrados.some(email => email.email === valorDigitado);
        if (emailJaCadastrado) {
            erroEmail.textContent = "Este email já está em uso."
        } else {
            erroEmail.textContent = "";
        }
    } else {
        erroEmail.textContent = "Por favor, insira um e-mail válido.";
    }
});

const senhaInput = document.querySelector("#senha");
senhaInput.addEventListener("input", () => {
    const valorDigitado = senhaInput.value;
    const erroUsuario = document.querySelector('.mensagem-erro.senha');
    if (valorDigitado.length < 8) {
        erroUsuario.textContent = "Sua senha deve ter mais que 8 caracteres."
    } else {
        erroUsuario.textContent = ""
    }
})

const verSenha = document.querySelector(".fa-solid.fa-eye");
verSenha.addEventListener("click", () => {
    const senhaInput = document.querySelector('#senha');
    const tipoSenha = senhaInput.getAttribute('type');
    senhaInput.setAttribute('type', tipoSenha === 'password' ? 'text' : 'password')
});

const emailConfInput = document.querySelector("#emailConf");
const emailConfErro = document.querySelector(".mensagem-erro.emailConf");

function verificarEmails() {
    const valorEmail = emailInput.value;
    const valorEmailConf = emailConfInput.value;
    if (valorEmailConf !== "" && valorEmail !== valorEmailConf) {
        emailConfErro.textContent = "Os endereços de email não são iguais.";
    } else {
        emailConfErro.textContent = "";
    }
}

emailInput.addEventListener("input", verificarEmails);
emailConfInput.addEventListener("input", verificarEmails);


formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let nome = evento.target.elements["nome"].value;
    let usuario = evento.target.elements["usuario"].value;
    let email = evento.target.elements["email"].value;
    let senha = evento.target.elements["senha"].value;

    const mensagemErro = document.querySelectorAll(".mensagem-erro");
    let possuirErro = false
    mensagemErro.forEach((mensagem) => {
        if (mensagem.textContent !== "") {
            possuirErro = true
            return;
        }
    })

    let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    cadastros.push({
        "nome": nome,
        "usuario": usuario,
        "email": email,
        "senha": senha,
    });

    localStorage.setItem("cadastros", JSON.stringify(cadastros));

    const inputs = formulario.querySelectorAll("input");
    inputs.forEach(input => {
        input.value = "";
    });

    window.location.href = "/pages/conta-criada.html";

    console.log(cadastros);
});