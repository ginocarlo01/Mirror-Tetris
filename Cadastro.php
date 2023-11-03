<?php
if (isset($_POST["name_co"]))
{
    try
    {
        $conn = new PDO("mysql:host=localhost;dbname=myDB", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
        $stmt = $conn->prepare('INSERT INTO Users (Username, FullName, BirthDate, CPF, Phone, Email, Password) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $stmt->bindParam(1, $_POST["username"]);
        $stmt->bindParam(2, $_POST["name_co"]);
        $stmt->bindParam(3, $_POST["dt_nasc"]);
        $stmt->bindParam(4, $_POST["cpf"]);
        $stmt->bindParam(5, $_POST["tel"]);
        $stmt->bindParam(6, $_POST["email"]);
        $stmt->bindParam(7, $_POST["pass_word"]);
        $stmt->execute();
        
        include("SignUpPage.html");
    }
    catch(PDOException $e)
    {
        echo "Ocorreu um erro: " . $e->getMessage();
    }	
}
else{
    echo "Ocorreu um erro: dado nao foi enviado corretamente!";
}

?>	