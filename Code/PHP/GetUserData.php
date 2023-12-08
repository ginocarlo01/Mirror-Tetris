<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
   
    try {
        $conn = new PDO("mysql:host=localhost;dbname=myDB", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
        $localUsername = $_SESSION["username"];

        $roundsSQL = 
        "SELECT *
        FROM Users
        WHERE Username = '$localUsername'
        LIMIT 1
        ";

        $stmt = $conn->query($roundsSQL);

        $userData = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response = array(
            'status' => 'success',
            'message' => 'Dados recuperados com sucesso',
            'userData' => $userData
        );

        $jsonResponse = json_encode($response);

        header('Content-Type: application/json');

        echo $jsonResponse;
        
    } catch (PDOException $e) {
        echo "Ocorreu um erro: " . $e->getMessage();
    }
} else {
    echo "Acesso inválido.";
}
?>
