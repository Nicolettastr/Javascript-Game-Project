const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const spanLives = document.querySelector('#lives'); 
const spanTime = document.querySelector('#time'); 
const spanRecord = document.querySelector('#record'); 
const reStart = document.querySelector('#restart');
const countdownText = document.querySelector('.countdown');
const loser = document.querySelector('.lost');
const winner = document.querySelector('.winner');
const gameContainer = document.querySelector('.game-container')
const playAgain = document.querySelector('#playAgain');
const endGame = document.querySelector('.endContainer');
const audio = new Audio('./pixelated-adventure-122039.mp3');
const levelNumber = document.querySelector('.num');

playAudio.addEventListener('click', () => {
    audio.play();
})

stopAudio.addEventListener('click', () => {
    audio.pause();
})
//Sirve para que se ejecute el codigo luego de que windows se halla cargado

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
window.addEventListener('keydown', moveByKeys);
up.addEventListener('click', moveUp);
down.addEventListener('click', moveDown);
right.addEventListener('click', moveRight);
left.addEventListener('click', moveLeft);
reStart.addEventListener('click', startAgain);
playAgain.addEventListener('click', anotherRound);
audio.addEventListener('click', playAudio);
// el evento resize, si funciona bien hasta este punto: 
/*function startGame(){

    let canvasSize;

    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }else if (window.innerHeight < window.innerWidth){
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute("width", canvasSize)

    canvas.setAttribute("height", canvasSize)

    //Cada elemento mide 10% del tamaño del canvas
    const elementsSize = canvasSize / 10;

    game.font =  elementsSize * 5 +  "% Verdana";
    game.textAlign = 'end';

    for(let i = 1; i <= 10; i++){
        game.fillText(emojis['X'], elementsSize * i, elementsSize);

    }*/

    //si se deja asi, los problemas vendrian luego cuando se hagan mas cambios, como el movimiento del jugador, cambios de niveles, etc.

    //Por ello se mejora de la siguiente manera: 
//Inicializar juego

// volver las variables locales, variables globales

let canvasSize;
let elementsSize;
let fireCollision = [];
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;
let record;
let levelNum = 1;


const playerPosition = {
    x: undefined,
    y: undefined
}

const giftPosition = {
    x: undefined,
    y: undefined
}

function startGame(){

    game.font =  elementsSize * 5 +  "% Verdana";
    game.textAlign = 'end';

    let map = maps[level];

    if(!map){
        gameFinished();
        return;
    }

    if(!timeStart){
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }



    let mapRows = map.trim().split("\n");
    let mapRowCols = mapRows.map(row => row.trim().split(''));
    
    showLives();
    showLevel();

    fireCollision = [];
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);

            if(col == 'O'){
                if(playerPosition.x == undefined && playerPosition.y == undefined){
                    playerPosition.x = posX,
                    playerPosition.y = posY
                }
            }else if(col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            }else if(col == 'X'){
                fireCollision.push({
                    x: posX, 
                    y: posY
                });
            };


            
            game.fillText(emoji, posX, posY);
            
            
            
        });
    });

    
    /*for(let row = 1; row <= 10; row++){
        for(let col = 1; col <= 10; col++){
            game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
        }
    }*/

    movePlayer();
}

function movePlayer() {
    if(playerPosition.x == giftPosition.x && playerPosition.y == giftPosition.y){
        levelWin();        
    }



    const chickeDinner = fireCollision.find(fire => {
        if(fire.x == playerPosition.x && fire.y == playerPosition.y){
            return true;
        }
    });

    if(chickeDinner){
        levelFail();
    }


    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}


function levelWin() {
    level++;
    levelNum++
    startGame();
}

function levelFail() {
    lives--;
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    if(lives > 0){
    }else{
        levelNum = 1;
        level = 0;
        lives = 3;
        timeStart = undefined;
        
    }
    
    startGame();
}

function showLives() {
    const livesArray = Array(lives).fill(emojis['HEART']) // crear un array donde no se sabe que tipo de elementos va a tener ese array pero si con las posiciones que va a tenr, que dichas posiciones van a depender de lo que halla en la variable que se usa de argumento.
    spanLives.innerHTML = '';
    livesArray.forEach(live => spanLives.append(live));
}

function showLevel() {
    levelNumber.innerHTML = levelNum;
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}

function gameFinished(){
    clearInterval(timeInterval);
    const recordTime = localStorage.getItem('record');
    const playerTime = Date.now() - timeStart;
    


    if(recordTime){
        if(playerTime < recordTime){
            localStorage.setItem('record', playerTime);
            winner.innerHTML = 'Ganaste y Superaste el record 😍​';
            winner.style.display = 'flex';
            gameContainer.style.display = 'none'
        }else {
            loser.style.display = 'flex';
            gameContainer.style.display = 'none'
            loser.innerHTML = 'Ganaste! pero no superaste el record 😵‍💫';
        }
    }else{
        localStorage.setItem('record', playerTime);
        
    }  
    
    playAgain.style.display = 'flex';
    playAgain.style.justifyContent = 'center'; 
}

function showRecord(){
    spanRecord.innerHTML = '🏁' +  localStorage.getItem('record');
}
// Function que se encarga del resize del canvas

function setCanvasSize(){


    if(window.innerHeight > window.innerWidth){
        canvasSize = Math.round(window.innerWidth * 0.8);
    }else if (window.innerHeight < window.innerWidth){
        canvasSize = Math.round(window.innerHeight * 0.8);
    }

    canvas.setAttribute("width", canvasSize)

    canvas.setAttribute("height", canvasSize)

    //Cada elemento mide 10% del tamaño del canvas
    elementsSize = Math.round((canvasSize / 10) - 0.8);

    // si se deja asi, al cambiar el tamaño del canvas, los elementos dentro de el se borran. Por eso se debe vincular a la funcion del canvas la funcion que se encargue del renderizado del mapa. 

    startGame()

    return canvasSize, elementsSize;
}

function moveByKeys(event){
    if(event.key == "ArrowUp") moveUp();
    else if(event.key == "ArrowDown") moveDown();
    else if(event.key == "ArrowRight") moveRight();
    else if(event.key == "ArrowLeft") moveLeft();
}        

function moveDown() {
    setCanvasSize();

    let elementSizeInt = Math.ceil(elementsSize);

    if(playerPosition.y + elementsSize> canvasSize){
        alert("cant move down")
    }else{
        playerPosition.y += elementSizeInt;
        startGame();

        
    }
}

function moveUp() {
    setCanvasSize();

    let elementSizeInt = Math.ceil(elementsSize);

    if(playerPosition.y - elementsSize < elementsSize){
        alert("cant move up")
    }else{
        playerPosition.y -= elementsSize;
        startGame();
    }
}

function moveRight() {
    setCanvasSize();

    let elementSizeInt = Math.ceil(elementsSize);

    if(playerPosition.x + elementsSize >= canvasSize ){
        alert('cant move rigth')
    }else{
        playerPosition.x += elementSizeInt;
        startGame();
    }
}

function moveLeft() {
    
    let elementSizeInt = Math.ceil(elementsSize);

    if(playerPosition.x - elementSizeInt < elementsSize){
        alert('cant move left')
    }else{
        playerPosition.x -= elementSizeInt;
        startGame();
    }
}

function countdown() {
    let numberCount = 3
    function count () {
        if (numberCount > 0) {
            countdownText.innerHTML = numberCount;
            numberCount--;
            setTimeout(count, 700);
        }else {
            countdownText.innerHTML ='Go!';
        }  
    }
    count ()
    startGame()
}

function startAgain() {
    countdown()
    levelNum = 1;
    level = 0;
    lives = 3;
    timeStart= undefined;
    playerPosition.x = undefined;
    playerPosition.y = undefined;  
    setTimeout(startGame, 3000);
}

function anotherRound() {
    startAgain()
    gameContainer.style.display = 'flex'
    winner.style.display = 'none';
    loser.style.display = 'none';
    playAgain.style.display = 'none';
}






