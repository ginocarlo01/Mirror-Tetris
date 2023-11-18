document.addEventListener('DOMContentLoaded', () => {

function fillRankingTable(rounds) {
    for (let i = 0; i < rounds.length; i++) {
        const round = rounds[i]; // Obtenha os dados do round

        const userCell = document.getElementById(`user${i + 1}`);
        const scoreCell = document.getElementById(`scoreRank${i + 1}`);
        const levelCell = document.getElementById(`levelRank${i + 1}`);
        
        userCell.textContent = round.Username;
        scoreCell.textContent = round.Score;
        levelCell.textContent = round.Level;
    }
}

function fillUserText(rounds) {
  
    const round = rounds[0]; // Obtenha os dados do round

    const userCell = document.getElementById(`userPosition`);
    
    userCell.textContent = "Sua posição no ranking atual é " + round.row_num;
    
  
}

function getRankingData() {
    var xhttp = new XMLHttpRequest();
    if (!xhttp) {
      alert('Não foi possível criar um objeto XMLHttpRequest.');
      return false;
    }
  
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        
        let resposta = JSON.parse(xhttp.responseText);
        if (resposta.status === 'success') {

          const rounds = resposta.rounds;

          fillRankingTable(rounds);
          
        }

      } else {
        console.log("Ha um problema ao mandar os dados!!");
      }
    }
  };
  
    xhttp.open('POST', 'GetRankingData.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
    xhttp.send();
  }

  function getUserRankingData() {
    var xhttp = new XMLHttpRequest();
    if (!xhttp) {
      alert('Não foi possível criar um objeto XMLHttpRequest.');
      return false;
    }
  
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        let resposta = JSON.parse(xhttp.responseText);
        if (resposta.status === 'success') {

          const rounds = resposta.rounds;
          fillUserText(rounds);
          
        }

      } else {
        console.log("Ha um problema ao mandar os dados!!");
      }
    }
  };
  
    xhttp.open('POST', 'GetUserRankingData.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
    xhttp.send();
  }

  getRankingData();
  getUserRankingData();

})