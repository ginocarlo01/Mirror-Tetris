<?php

if (isset($_POST["name_co"])) {
    try {
        session_start();
        $conn = new PDO("mysql:host=localhost;dbname=myDB", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare('UPDATE Users SET FullName = ?, Phone = ?, Email = ?, Password = ? WHERE Username = ?');
        $stmt->bindParam(1, $_POST["nome_co"]);
        $stmt->bindParam(2, $_POST["tel"]);
        $stmt->bindParam(3, $_POST["email"]);
        $stmt->bindParam(4, $_POST["pass_word"]);
        $stmt->bindParam(5, $_SESSION["username"]);
        $stmt->execute();

        $rowCount = $stmt->rowCount();
        echo "Número de linhas afetadas: " . $rowCount . "<br>"; // Mensagem de depuração
        if ($rowCount > 0) {
            unset($_SESSION['username']);
            unset($_SESSION['password']);
            $mensagem = "Dados atualizados, faca login novamente";
            header("Location: SignUpPage.html?mensagem=$mensagem!");
        } else {
            include("CheckCredentialsBeforeEdit.php");
        }
    } catch (PDOException $e) {
        echo "Ocorreu um erro: " . $e->getMessage(); // Mensagem de erro do PDO
    }
} else {
    echo "Formulário não enviado corretamente"; // Mensagem de depuração para o caso em que o formulário não foi enviado
}
