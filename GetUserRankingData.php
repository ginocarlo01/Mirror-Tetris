<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
   
    try {
        $conn = new PDO("mysql:host=localhost;dbname=myDB", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
        $localUsername = $_SESSION["username"];

        $roundsSQL =
        "WITH RankingsOrdered AS (
            SELECT
                Username,
                ROW_NUMBER() OVER (ORDER BY Score DESC, Username DESC) AS row_num
            FROM Rankings
            
        )
        SELECT
            row_num
        FROM RankingsOrdered
        WHERE Username = '$localUsername'
        LIMIT 1
        ";

        $stmt = $conn->query($roundsSQL);

        $rounds = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response = array(
            'status' => 'success',
            'message' => 'Dados recuperados com sucesso',
            'rounds' => $rounds
        );

        $jsonResponse = json_encode($response);

        header('Content-Type: application/json');

        echo $jsonResponse;
        
    } catch (PDOException $e) {
        echo "Ocorreu um erro: " . $e->getMessage();
        $response = array(
            'status' => 'error',
            'message' => 'Ocorreu um erro: ' . $e->getMessage()
        );
        $jsonResponse = json_encode($response);

        header('Content-Type: application/json');

        echo $jsonResponse;
        
    }
} else {
    echo "Acesso inválido.";
}
?>
