document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);

    const mensagem = params.get('mensagem');

    if (mensagem) {
        const mensagemElement = document.getElementById('mensagem');
        if (mensagemElement) {
            mensagemElement.innerHTML = mensagem;
        }
    }

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("pass_word");
    const loginButton = document.getElementById("log_in");

    loginButton.disabled = true;
    usernameInput.addEventListener("input", checkInputs);
    passwordInput.addEventListener("input", checkInputs);

    function checkInputs() {
        if (usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
            loginButton.disabled = false;
        } else {
            loginButton.disabled = true;
        }
    }

})