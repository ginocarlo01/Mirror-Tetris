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

    // Disable the login button initially
    loginButton.disabled = true;

    // Add input event listeners to the Username and Password fields
    usernameInput.addEventListener("input", checkInputs);
    passwordInput.addEventListener("input", checkInputs);

    function checkInputs() {
        // Check if both the Username and Password fields have values
        if (usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
            loginButton.disabled = false; // Enable the login button
        } else {
            loginButton.disabled = true; // Disable the login button
        }
    }

})