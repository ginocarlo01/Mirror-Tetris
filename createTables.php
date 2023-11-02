<?php
                echo "<p>Criando tabela no banco de dados... </p>";
				try {
					$conn = new PDO("mysql:host=localhost;dbname=myDB", "root", "");
					$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				
					$sql = "CREATE TABLE Users (
                        Username VARCHAR(50) PRIMARY KEY,
                        FullName VARCHAR(255) NOT NULL,
                        BirthDate DATE NOT NULL,
                        CPF VARCHAR(11) NOT NULL,
                        Phone VARCHAR(15),
                        Email VARCHAR(255) NOT NULL,
                        Password VARCHAR(255) NOT NULL
                      )";

					$conn->exec($sql);

                    $sql = "CREATE TABLE Rankings (
                        RankID INT AUTO_INCREMENT PRIMARY KEY,
                        Username VARCHAR(50) NOT NULL,
                        Score INT NOT NULL,
                        Level INT NOT NULL,
                        Duration TIME NOT NULL,
                        FOREIGN KEY (Username) REFERENCES Users(Username)
                      )";

					$conn->exec($sql);

					echo "<p>Tabela criada com sucesso</p>";

					$conn = null;
				}
				catch(PDOException $e)
				{
					echo "Ocorreu um erro: " . $e->getMessage();
				}
	?>