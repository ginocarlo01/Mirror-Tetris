<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="UTF-8">
	<title>Exercicio 3 PHP</title>
</head>
<body>
      
    <div id="container">
    	<div id="header">
    		<h1>Exercicio 3 PHP</h1>
			<h2>Alunos Cadastrados Ordenados por RA</h2>
    	</div>

    
    	<div id="content" style="float:left;">
    		
    		<?php
				try
				{
					$conn = new PDO("mysql:host=localhost;dbname=myDB", "root", "");
					$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

					$sql = "ALTER TABLE Rankings
                    MODIFY Duration VARCHAR(20) NOT NULL
                    ";
					$stmt = $conn->query($sql); // Returns an object from class PDOStatement
				
					echo "Deleted successfully";
				}
				catch(PDOException $e)
				{
					echo "Ocorreu um erro: " . $e->getMessage();
				}
			?>
    	</div>
    </div>  
</body>
</html>
