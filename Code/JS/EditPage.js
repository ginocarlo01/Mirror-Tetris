document.addEventListener('DOMContentLoaded', () => {

    const nameCompletoInput = document.getElementById("name_completo");
    const telInput = document.getElementById("tel");
    const emailInput = document.getElementById("email");
    const passWordInput = document.getElementById("pass_word");
    const saveChangesButton = document.getElementById("saveChanges");

    saveChangesButton.disabled = true;

    nameCompletoInput.addEventListener("input", checkInputs);
    telInput.addEventListener("input", checkInputs);
    emailInput.addEventListener("input", checkInputs);
    passWordInput.addEventListener("input", checkInputs);

    document.getElementById('tel').addEventListener('input', function (e) {
        // Remove todos os caracteres não numéricos
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    function checkInputs() {
        if (nameCompletoInput.value.trim() !== "" &&
            telInput.value.trim() !== "" &&
            emailInput.value.trim() !== "" &&
            passWordInput.value.trim() !== "") {
            saveChangesButton.disabled = false; 
        } else {
            saveChangesButton.disabled = true;
        }
    }
});
