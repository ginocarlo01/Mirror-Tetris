<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    if (isset($_POST['score']) && isset($_POST['level']) && isset($_POST['time'])) {
        $score = $_POST['score'];
        $level = $_POST['level'];
        $time = $_POST['time'];

        try
        {
            $conn = new PDO("mysql:host=localhost;dbname=myDB", "root", "");
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
            $stmt = $conn->prepare('INSERT INTO Rankings (Username, Score, Level, Duration) VALUES (?, ?, ?, ?)');
            $stmt->bindParam(1, $_SESSION["username"]);
            $stmt->bindParam(2, $score);
            $stmt->bindParam(3, $level);
            $stmt->bindParam(4, $time);
            $stmt->execute();
        }
        catch(PDOException $e)
        {
            echo "Ocorreu um erro: " . $e->getMessage();
        }	

    } else {
        echo "Dados incompletos.";
    }
} else {
    echo "Acesso inválido.";
}
?>
