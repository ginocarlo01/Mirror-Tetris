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

					$sql = "SELECT * FROM Rankings order by Score";
					$stmt = $conn->query($sql); // Returns an object from class PDOStatement
				
					while($row = $stmt->fetch(PDO::FETCH_ASSOC))
					{
                    	echo "<p>username: " . $row["Username"] . "</p>";
                        echo "<p>rankid: " . $row["RankID"] . "</p>";
                        echo "<p>Score: " . $row["Score"] . "</p>";
                        echo "<p>Score: " . $row["Duration"] . "</p>";
                                                
                    }
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
