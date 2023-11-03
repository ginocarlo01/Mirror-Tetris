document.addEventListener('DOMContentLoaded', () => {

    const nameCompletoInput = document.getElementById("name_completo");
    const telInput = document.getElementById("tel");
    const emailInput = document.getElementById("email");
    const passWordInput = document.getElementById("pass_word");
    const saveChangesButton = document.getElementById("saveChanges");

    // Disable the saveChanges button initially
    saveChangesButton.disabled = true;

    // Add input event listeners to the input fields
    nameCompletoInput.addEventListener("input", checkInputs);
    telInput.addEventListener("input", checkInputs);
    emailInput.addEventListener("input", checkInputs);
    passWordInput.addEventListener("input", checkInputs);

    function checkInputs() {
        // Check if all input fields have values
        if (nameCompletoInput.value.trim() !== "" &&
            telInput.value.trim() !== "" &&
            emailInput.value.trim() !== "" &&
            passWordInput.value.trim() !== "") {
            saveChangesButton.disabled = false; // Enable the saveChanges button
        } else {
            saveChangesButton.disabled = true; // Disable the saveChanges button
        }
    }
});
