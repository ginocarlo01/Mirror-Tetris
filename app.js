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
const timeMoveDown = 500;
let upScore = 10;
let score = 0;
const startPos = 18;
let isInverted = false;
const colors = [
  'orange',
  'red',
  'purple',
  'rgb(255, 255, 0)',
  'rgb(0, 173, 230)', 
  'blue',
  'green',
  'white',
  'white',
  'white',
  'white',
  'white',
  'white',
  'white'
]

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
  let currentRot = 0;

  let random = chooseRandom();
  let current = theTetrominoes[random][currentRot];

  function drawTetromino(){
    current.forEach(index => {
        squares[currentPos + index].classList.add("tetromino");
        squares[currentPos + index].style.backgroundColor = colors[random];
    })
  }

  function undrawTetromino(){
    current.forEach(index => {
        squares[currentPos + index].classList.remove("tetromino");
        squares[currentPos + index].style.backgroundColor = "";
    })
  }

//assigning functions to keycodes
function control(e){
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
}

document.addEventListener('keyup', control);

function moveDown(){
    depositTetromino(); //check if cllided
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
    timerId = setInterval(moveDown, timeMoveDown);
    nextRandom = chooseRandom();
    showNextTetromino();
  }
})

//selecionar peça randomicamente
function chooseRandom(){
  return Math.floor(Math.random() * theTetrominoes.length);
}

function checkToCleanRow(){
  let localInverted = false;
  for(let i = 1; i < (width*(height-1)-2); i+=width){
    const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
    
    if(row.every(index => squares[index].classList.contains('taken'))) {
      score += upScore; //add score
      scoreDisplay.innerHTML = score; //atualiza ui do score
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

  function changeView() {
    //em loop até percorrer todas as linha:

    const matrizInvertida = [];
    
    for(let i = 0; i < (width*(height-1)-2); i+=width)
    {
      //cópia da row
      const squaresRemoved = squares.slice(228, 240); //linha original
      console.log(squaresRemoved);
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
    
      matrizInvertida.push(squaresRemovedAux);
      
      //adiciona ela no início novamente
      
      squares.splice(228, 12)
      squares = squaresRemovedAux.concat(squares) //paramos aqui, a linha inverte, mas ela aparece no início. Eu quero que ela apareça no final!
      squares.forEach(cell => grid.appendChild(cell))
      

    }

    // adição massiva não funcionando:
    /*
    squares.splice(0, squares.length)
    squares = squares.concat(matrizInvertida) 
    squares.forEach(cell => grid.appendChild(cell))
    */
    console.log(matrizInvertida);
  }
  

  if(localInverted && !isInverted){ //se esse clean tiver uma linha especial e o modo de jogo não for especial
    isInverted = true; //então agora o modo de jogo será especial
    changeView();
  }
  else{
    if(localInverted && isInverted){ //se esse clean tiver uma linha especial e o modo de jogo for especial
      isInverted = false; //então agora o modo de jogo não será especial
      changeView();
    }
  }
  
}

function checkGameOver(){
  if(current.some(index => squares[currentPos + index].classList.contains('taken'))){
    scoreDisplay.innerText = "Game Over! :( " //atualiza o texto 
    clearInterval(timerId); // pausa o timer
  }
}
/*
function changeView(){
  newSquares = squares;
  for(let rowRunner = 0; rowRunner < (1 + width * (height-2)); rowRunner+=12){
    for(let newCol = 10, col = 1; col < 6 ;col++, newCol--){
      newSquares[newCol + rowRunner] = squares[col + rowRunner];
      //10 nova = 1 original 
      //9 nova = 2 original
      //8 nova = 3 original
      //7 nova = 4 original
      //6 nova = 5 original
      
    }
    for(let newCol = 10, col = 1; col < 6 ;col++, newCol--){
      newSquares[col + rowRunner] = squares[newCol + rowRunner];
      //1 nova = 10 original
      //2 nova = 9 original
      //3 nova = 8 original
      //4 nova = 7 original
      //5 nova = 6 original
      
    }
  }
  console.log(newSquares);
  squares = newSquares;
}
*/


})