<?php
if (isset($_POST["username"])) {
    session_start();
    $localUserName = $_POST["username"];
    $localPassWord = $_POST["pass_word"];
    $mensagem = "";

    try {
        $conn = new PDO("mysql:host=localhost;dbname=myDB", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $getUserSQL = "SELECT Username FROM Users WHERE Username = :username";
        $getPasswordSQL = "SELECT Password FROM Users WHERE Username = :username";

        $stmtUser = $conn->prepare($getUserSQL);
        $stmtUser->bindParam(':username', $localUserName);
        $stmtUser->execute();

        $stmtPass = $conn->prepare($getPasswordSQL);
        $stmtPass->bindParam(':username', $localUserName);
        $stmtPass->execute();

        if ($stmtUser->rowCount() == 1 && $stmtPass->rowCount() == 1) {
            $rowUser = $stmtUser->fetch(PDO::FETCH_ASSOC);
            $rowPass = $stmtPass->fetch(PDO::FETCH_ASSOC);


            if ($localPassWord === $rowPass["Password"] && $localUserName === $rowUser["Username"]) {
                $_SESSION["username"] = $_POST["username"];
                $_SESSION["password"] = $_POST["pass_word"];
                include("Game.html");
            } else {
                $mensagem = "Senha incorreta";
                header("Location: index.html?mensagem=$mensagem!");
            }
        } else {
            $mensagem = "Username não existe";
            header("Location: index.html?mensagem=$mensagem!");
        }
    } catch (PDOException $e) {
        echo "Ocorreu um erro: " . $e->getMessage();
    }

    echo $mensagem;
    
}
else{
    include("index.html");
}
?>
