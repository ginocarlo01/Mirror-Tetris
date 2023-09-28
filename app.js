document.addEventListener('DOMContentLoaded', () => {

  const width = 12;
  const height = 21;

  const tetrisGrid = document.querySelector('.grid');

  for (let i = 0; i < (height*width); i++) { 
    const div = document.createElement('div');
    tetrisGrid.appendChild(div);
  }

  const gridDivs = document.querySelectorAll('.grid div');

  for (let i = gridDivs.length - width; i < gridDivs.length; i++) {
    gridDivs[i].classList.add('taken');
  }

  for (let i = 0; i < (width*(height-1)); i+=width) {
    gridDivs[i].classList.add('taken');
  }

  for (let i = (width-1); i < (width*height-1); i+=width) {
    gridDivs[i].classList.add('taken');
  }


const grid = document.querySelector(".grid"); 

let squares = Array.from(document.querySelectorAll(".grid div")); 
let scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("start-button");
let nextRandom = 0;
let timerId;

const initialSpeed = 800;
let currentSpeed = initialSpeed;
let speedIncrease = 100;
let scoreToIncreaseSpeed = 10;
let minimumSpeed = 100;
let upScore = 10;
let score = 0;
const startPos = 18;
let isInverted = false;

backgroundColorsBorder = ['grey', 'darkgreen']
backgroundColorsCounter = 0;

const transparency = 0.45; // Defina o valor de transparência aqui

const colors = [
  'orange',
  'red',
  'purple',
  'rgb(255, 255, 0)',
  'rgb(0, 173, 230)', 
  'blue',
  'green',
  'pink', 
  'pink', 
  'pink', 
  'pink', 
  'pink', 
  'pink', 
  'pink'  
];

const transparentColors = [
  `rgba(255, 165, 0, ${transparency})`,   // Orange
  `rgba(255, 0, 0, ${transparency})`,     // Red
  `rgba(128, 0, 128, ${transparency})`,   // Purple
  `rgba(255, 255, 0, ${transparency})`,   // Yellow
  `rgba(0, 173, 230, ${transparency})`,   // Light Blue
  `rgba(0, 0, 255, ${transparency})`,     // Blue
  `rgba(0, 128, 0, ${transparency})`,     // Green
  `rgba(255, 192, 203, ${transparency})`, // Pink
  `rgba(255, 192, 203, ${transparency})`, // Pink
  `rgba(255, 192, 203, ${transparency})`, // Pink
  `rgba(255, 192, 203, ${transparency})`, // Pink
  `rgba(255, 192, 203, ${transparency})`, // Pink
  `rgba(255, 192, 203, ${transparency})`, // Pink
  `rgba(255, 192, 203, ${transparency})`  // Pink
];


  //The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const lOTetromino = [ //opposite L
    [1, width+1, width*2+1, width*2+2],
    [width, width+1, width+2, width*2],
    [1, width+1, width*2+1, 0], 
    [width+2, width*2, width*2+1, width*2+2] 
  ]

  const zTetromino = [
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1]
  ]

  const zOTetromino = [
    [width, width+1,width*2+1,width*2+2],
    [width*2+1,width+1,width+2,2],
    [width, width+1,width*2+1,width*2+2],
    [width, width*2, 1, width+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  //reverse tetrominoes (special)
  const iTetrominoSpecial = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const oTetrominoSpecial = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const lTetrominoSpecial = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const lOTetrominoSpecial = [ //opposite L
    [1, width+1, width*2+1, width*2+2], 
    [width, width+1, width+2, width*2], 
    [1, width+1, width*2+1, 0], 
    [width+2, width*2, width*2+1, width*2+2] 
  ]

  const tTetrominoSpecial = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const uTetrominoSpecial = [
    [width*2, width*2+1, width*2+2, width, width+2],
    [0, width, width*2, 1, width*2+1],
    [width, width+1, width+2, width*2,width*2+2],
    [1, width*2+1, 2, width+2, width*2+2]
  ]

  const loTetrominoSpecial = [ //little o
    [0],
    [0],
    [0],
    [0]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino, lOTetromino, zOTetromino, iTetrominoSpecial, oTetrominoSpecial, lTetrominoSpecial, lOTetrominoSpecial, tTetrominoSpecial, uTetrominoSpecial, loTetrominoSpecial]
  
 const theTetrominoesNames =
 [
  "lTetromino",
  "zTetromino",
  "tTetromino",
  "oTetromino",
  "iTetromino",
  "lOTetromino",
  "zOTetromino",
  "iTetrominoSpecial",
  "oTetrominoSpecial",
  "lTetrominoSpecial",
  "lOTetrominoSpecial",
  "tTetrominoSpecial",
  "uTetrominoSpecial",
  "loTetrominoSpecial"
]

  
  let currentPos = startPos;
  let previewPos = 0;
  let currentRot = 0;

  let random = chooseRandom();
  let current = theTetrominoes[random][currentRot];

  function drawTetromino(){
    drawGhost();
    current.forEach(index => {
        squares[currentPos + index].classList.add("tetromino");
        squares[currentPos + index].style.backgroundColor = colors[random];
    })

    
  }

  function undrawTetromino(){
    undrawGhost();
    
    current.forEach(index => {
        squares[currentPos + index].classList.remove("tetromino");
        squares[currentPos + index].style.backgroundColor = "";
    })

    
  }

//assigning functions to keycodes
function control(e){
  if(timerId){
    if(e.keyCode == 37){
      if(!isInverted){
        moveLeft();
      }
      else{
        moveRight();
      }
      
    }

    else if(e.keyCode == 39){
      if(!isInverted){
        moveRight();
      }
      else{
        moveLeft();
      }
      
    }

    else if(e.keyCode == 38){
      rotate();
    }

    else if(e.keyCode == 40){
      moveDown();
    }

    else if(e.keyCode == 32){
      hardDrop();
    }
  }
}

document.addEventListener('keyup', control);

function moveDown(){
    depositTetromino(); //check if collided
    undrawTetromino();
    currentPos += width; //goes down a row
    drawTetromino();
    
}

function depositTetromino(){
    if(current.some(index => squares[currentPos + index + width].classList.contains("taken"))) {
        
        current.forEach(index => squares[currentPos + index].classList.add("taken"));
        //checa se é invertido e adiciona uma classe no div em relação a isso
        if(theTetrominoesNames[random].includes("Special"))
        {
          current.forEach(index => squares[currentPos + index].classList.add("special"));
        }
        //start a new tetromino falling
        random = nextRandom
        nextRandom = chooseRandom();
        current = theTetrominoes[random][currentRot];
        currentPos = startPos;
        
        showNextTetromino(); //determina a próxima peça
        checkToCleanRow();
        drawTetromino();
        checkGameOver();
}
}

function hardDrop() {
  while (!current.some(index => squares[currentPos + index + width].classList.contains("taken"))) {
    moveDown();
  }
  depositTetromino();
}


function drawGhost(){
  previewPos = currentPos;
  while (!current.some(index => squares[previewPos + index + width].classList.contains("taken"))) {
    previewPos += width;
  }

  current.forEach(index => {
    squares[previewPos + index].style.backgroundColor = transparentColors[random];
})

}

function undrawGhost(){
  current.forEach(index => {
    squares[previewPos + index].style.backgroundColor = "";
})

}

//move left, unless it is on the edge or there is something else blocking

function moveLeft(){
  undrawTetromino();
  const isAtLeftEdge = current.some(index => (currentPos + index) % width == 0)

  if(!isAtLeftEdge){
    currentPos -= 1; //vai pra esquerda
  }

  if(current.some(index => squares[currentPos + index].classList.contains("taken"))) {
    currentPos += 1; //volta pra direita caso tenha algo na esquerda
  }

  drawTetromino();

}

function moveRight(){
  undrawTetromino();
  const isRightEdge = current.some(index => (currentPos + index + 1) % (width) == 0)

  if(!isRightEdge){
    currentPos += 1; //vai pra esquerda
  }

  if(current.some(index => squares[currentPos + index].classList.contains("taken"))) {
    currentPos -= 1; //volta pra direita caso tenha algo na esquerda
  }

  drawTetromino();

}

function rotate(){
  undrawTetromino();

  let newRot = currentRot + 1;

  if (newRot === 4) {
    newRot = 0;
  }

  const newCurrent = theTetrominoes[random][newRot]; 
 
  const hasCollision = newCurrent.some(index => squares[currentPos + index].classList.contains("taken"));

  if (!hasCollision) {
    currentRot = newRot;
    current = newCurrent;
  }

  
  drawTetromino();
}

//show up next grid
const displaySquares = (document.querySelectorAll(".mini-grid div"));
const displayWidth = 4;
let displayIndex = 0;

//the tetraminos without rotations
const upNextTetrominoes = [
  [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
  [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
  [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
  [0, 1, displayWidth, displayWidth+1], //oTetromino
  [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1], //iTetromino
  [1, displayWidth+1, displayWidth*2+1, displayWidth*2+2], //lOTetromino
  [displayWidth, displayWidth+1,displayWidth*2+1,displayWidth*2+2], //zOTetromino
  [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1], //iTetrominoSpecial
  [0,1,displayWidth,displayWidth+1], //oTetrominoSpecial
  [1, displayWidth+1, displayWidth*2+1, 2], //lTetrominoSpecial
  [1, displayWidth+1, displayWidth*2+1, displayWidth*2+2], //lOTetrominoSpecial
  [1,displayWidth,displayWidth+1,displayWidth+2], //tTetrominoSpecial
  [displayWidth*2, displayWidth*2+1, displayWidth*2+2, displayWidth, displayWidth+2], //uTetrominoSpecial
  [5] //little o
]

function showNextTetromino(){
  displaySquares.forEach(square => {
    square.classList.remove('tetromino'); //remove tetromino de todo o mini-grid
    square.style.backgroundColor = ""; //retira a cor
  })
  upNextTetrominoes[nextRandom].forEach(index => {
    displaySquares[index + displayIndex].classList.add("tetromino"); //coloca o novo tetromino
    displaySquares[index + displayIndex].style.backgroundColor = colors[nextRandom]; //coloca a cor
  })
}

//button
startBtn.addEventListener('click', () => {
  if(timerId){ //se tiver alguma informação no timerId
    clearInterval(timerId); //para o timerId
    timerId = null; //timerId se torna nulo novamente
  }
  else{
    drawTetromino();
    timerId = setInterval(moveDown, currentSpeed);
    nextRandom = chooseRandom();
    showNextTetromino();
  }

  //"deseleciona" o botão
  startBtn.blur();
})

//selecionar peça randomicamente
function chooseRandom(){
  return Math.floor(Math.random() * theTetrominoes.length);
}

function checkToCleanRow(){
  let localInverted = false;
  let localScore = 0;
  let finalLocalScore = 0;
  let counterRowsCleaned = 0;

  for(let i = 1; i < (width*(height-1)-2); i+=width){
    const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
    
    if(row.every(index => squares[index].classList.contains('taken'))) {
      localScore+=upScore;
      counterRowsCleaned++;
      const squaresRemoved = squares.splice(i, width)
      //checa se tem algum special e se tiver, atualiza a variável inverted
      if(squaresRemoved.some(index => index.classList.contains('special')))
      {
        //isInverted = !isInverted;
        if(!localInverted){
          localInverted = true;
        }
      }
      squaresRemoved.forEach((index) => {
        index.classList = '';
        index.style.backgroundColor = '';
      })

      squaresRemoved[0].classList.add('taken'); //primeiro
      squaresRemoved[squaresRemoved.length-1].classList.add('taken'); //último
      squares = squaresRemoved.concat(squares)
      squares.forEach(cell => grid.appendChild(cell))
      
    }
  }

  //handle score:
  if(localScore > 0){
    finalLocalScore = localScore * counterRowsCleaned;
    score += finalLocalScore; //add score
    scoreDisplay.innerHTML = score; //atualiza ui do score
    
    //increase speed
    handleSpeed();
  }
  

  //inversão do tabuleiro:
  if(localInverted && !isInverted){ //se esse clean tiver uma linha especial e o modo de jogo não for especial
    isInverted = true; //então agora o modo de jogo será especial
    Mirror();
    
  }
  else
  {
    if(localInverted && isInverted){ //se esse clean tiver uma linha especial e o modo de jogo for especial
      isInverted = false; //então agora o modo de jogo não será especial
      Mirror();
      
    }
  }

  changeBorderColor(0);

}

function Mirror() {
  //em loop até percorrer todas as linha:
  for(let i = 0; i < (width*(height-1)-2); i+=width)
  {
    //cópia da row
    const squaresRemoved = squares.slice(width*(height-2), width*(height-2) + width); //linha original
    const squaresRemovedAux = []; //linha invertida
    
    //inverte colunas dessa linha
    for (let newCol = squaresRemoved.length - 1, col = 0; col < squaresRemoved.length; col++, newCol--) 
    {
      //new col = 11, col 0
      //new col = 10, col 1
      //new col = 9, col 2
      //new col = 8, col 3
      //new col = 7, col 4
      //new col = 6, col 5
      //new col = 5, col 6
      //new col = 4, col 7
      //new col = 3, col 8
      //new col = 2, col 9
      //new col = 1, col 10
      //new col = 0, col 11
      squaresRemovedAux[newCol] = squaresRemoved[col];
    }
    
    //adiciona ela no início novamente
    squares.splice(width*(height-2), width);
    squares = squaresRemovedAux.concat(squares);
    squares.forEach(cell => grid.appendChild(cell));
  }
  changeBorderColor(1);
}

function checkGameOver(){
  if(current.some(index => squares[currentPos + index].classList.contains('taken'))){
    //scoreDisplay.innerText = "Game Over! :( " //atualiza o texto 

    clearInterval(timerId); // pausa o timer

    //pop up and reload
    alert("Game over :(");
    window.location.reload();
  }
}

function handleSpeed(){
  let newSpeed = calculateNewSpeed();
  if (score % scoreToIncreaseSpeed === 0 &&  newSpeed > minimumSpeed) {
    currentSpeed = newSpeed;
  }
}

function calculateNewSpeed(){
  return initialSpeed - calculateSpeedMultiplier() * speedIncrease;
}

function calculateSpeedMultiplier() {
  const multiplier = Math.floor(score / scoreToIncreaseSpeed);
  
  return multiplier;
}

function changeBorderColor(changeInt){
  
  if(changeInt == 1)
  {
    backgroundColorsCounter++;
    if(backgroundColorsCounter > backgroundColorsBorder.length - 1){
      backgroundColorsCounter = 0;
    }
  }
  
  console.log(backgroundColorsCounter);
  let newColor = backgroundColorsBorder[backgroundColorsCounter];
  const gridDivs = document.querySelectorAll('.grid div');

  // Altere o background-color dos elementos de acordo com as condições
  for (let i = gridDivs.length - width; i < gridDivs.length; i++) {
    gridDivs[i].style.backgroundColor = newColor;
  }

  for (let i = 0; i < (width * (height - 1)); i += width) {
    gridDivs[i].style.backgroundColor = newColor;
  }

  for (let i = width - 1; i < width * height - 1; i += width) {
    gridDivs[i].style.backgroundColor = newColor;
  }

}


})