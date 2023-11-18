document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById("username");
    const nameCoInput = document.getElementById("name_co");
    const cpfInput = document.getElementById("cpf");
    const dtNascInput = document.getElementById("dt_nasc");
    const telInput = document.getElementById("tel");
    const emailInput = document.getElementById("email");
    const passWordInput = document.getElementById("pass_word");
    const logInButton = document.getElementById("log_in");

    logInButton.disabled = true;

    usernameInput.addEventListener("input", checkInputs);
    nameCoInput.addEventListener("input", checkInputs);
    cpfInput.addEventListener("input", checkInputs);
    dtNascInput.addEventListener("input", checkInputs);
    telInput.addEventListener("input", checkInputs);
    emailInput.addEventListener("input", checkInputs);
    passWordInput.addEventListener("input", checkInputs);

    function checkInputs() {
        if (
            usernameInput.value.trim() !== "" &&
            nameCoInput.value.trim() !== "" &&
            cpfInput.value.trim() !== "" &&
            dtNascInput.value.trim() !== "" &&
            telInput.value.trim() !== "" &&
            emailInput.value.trim() !== "" &&
            passWordInput.value.trim() !== ""
        ) {
            logInButton.disabled = false; 
        } else {
            logInButton.disabled = true;
        }
    }
});
