<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
   
    try {
        $conn = new PDO("mysql:host=localhost;dbname=myDB", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
        $localUsername = $_SESSION["username"];

        $roundsSQL = 
        "SELECT *
        FROM Rankings r
        WHERE Username = '$localUsername'
        ORDER BY Score DESC
        LIMIT 5
        ";

        $stmt = $conn->query($roundsSQL);

        $rounds = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Montar um array associativo com os dados que você deseja enviar de volta
        $response = array(
            'status' => 'success',
            'message' => 'Dados recuperados com sucesso',
            'rounds' => $rounds
        );

        // Converter o array associativo em uma string JSON
        $jsonResponse = json_encode($response);

        // Definir o cabeçalho da resposta como JSON
        header('Content-Type: application/json');

        // Enviar a resposta JSON de volta para o JavaScript
        echo $jsonResponse;
        
    } catch (PDOException $e) {
        echo "Ocorreu um erro: " . $e->getMessage();
    }
} else {
    echo "Acesso inválido.";
}
?>
