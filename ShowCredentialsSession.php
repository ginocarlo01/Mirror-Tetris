<?php
session_start();
if (isset($_SESSION["username"]) && isset($_SESSION["password"]) ) {

    $localUserName = $_SESSION["username"];
    $localPassWord = $_SESSION["password"];

    try {
        $conn = new PDO("mysql:host=localhost;dbname=myDB", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $getUserSQL = "SELECT Username FROM Users WHERE Username = :username";
        $getPasswordSQL = "SELECT Password FROM Users WHERE Username = :username";
        $getAllSQL = "SELECT * FROM Users WHERE Username = :username";
        $stmtUser = $conn->prepare($getUserSQL);
        $stmtUser->bindParam(':username', $localUserName);
        $stmtUser->execute();

        $stmtPass = $conn->prepare($getPasswordSQL);
        $stmtPass->bindParam(':username', $localUserName);
        $stmtPass->execute();

        $stmtAll = $conn->prepare($getAllSQL);
        $stmtAll->bindParam(':username', $localUserName);
        $stmtAll->execute();

        if ($stmtUser->rowCount() == 1 && $stmtPass->rowCount() == 1) {
            $rowUser = $stmtUser->fetch(PDO::FETCH_ASSOC);
            $rowPass = $stmtPass->fetch(PDO::FETCH_ASSOC);
            $rowAll = $stmtAll->fetch(PDO::FETCH_ASSOC);
            echo $localPassWord. "<br>";
            echo $rowPass["Password"]. "<br>";
            echo $localUserName. "<br>";
            echo $rowUser["Username"]. "<br>";
            echo $rowAll["FullName"]. "<br>";
            
        } else {
            $mensagem = "Usuário não existe";
        }
    } catch (PDOException $e) {
        echo "Ocorreu um erro: " . $e->getMessage();
    }
}
else{
    $mensagem = "Por favor acesse a pagina de login primeiro";
    echo $mensagem;
}  
    
?>
