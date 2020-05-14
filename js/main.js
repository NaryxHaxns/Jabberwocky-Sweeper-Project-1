//Constants

//Lose Object to randomize failure messages
let lose = {
    '1': 'The Jabberwock caught you in its claws and bit you with its jaws!',
    '2': 'The Jubjub bird swooped down and plucked you from the ground!',
    '3': 'You have become the latest catch of the frumious Bandersnatch!'
}

//State variables

//Declare board
let board;

//Declare true/false board
let winBoard;

let isWin;

//Declare timer and clock initialization variables
let timerFunc = setInterval(timerClock, 1000);

let begin = 1;

//Declare number of mines left
let mines;

//Declare win
let winner;

let youWin;

let loser;

//Empty Array for mine logic
let mineIdx = [];

//Array for recursive logic
let checked = [];

//End Game Message
let gameOver = document.querySelector('.endGame');

//Cached elements

//An array of column Arrays creating an accessible board of Elements
const boardElem = [];

for (let col = 1; col < 10; col++) {
    boardElem.push(Array.from(document.querySelectorAll(`#board section:nth-child(${col}) > div`)));
};

//Event Listeners

//Establish a listener/function for every click on every tile
document.getElementById('board').addEventListener('click', tileSelect);

function tileSelect(e) {
    // timerClock();
    let clIdxRow = e.target.getAttribute('row');
    let clIdxCol = e.target.getAttribute('col');
    if(board[clIdxRow][clIdxCol] === -1){
        winner = loser;
        for(i = 0; i < board.length; i++){
            for(j = 0; j < board[i].length; j++){
                if(board[i][j] === -1){
                    boardElem[clIdxCol][clIdxRow].setAttribute('style', 'background-image: url(https://i.imgur.com/dNjBu6E.jpg); background-size: cover;')
                }
                boardElem[clIdxCol][clIdxRow].setAttribute('style', 'background-image: url(https://i.imgur.com/DG8VfK0.jpg); background-size: cover;');
            }
        }
    } else {
        zeroVoid(clIdxRow, clIdxCol);
    };
    render();
};

//Establish a listener/function for game reset
document.querySelector('button').addEventListener('click', init);

//Initialization
init();

function init() {
    //Establish the board as a new/clear game
    board = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ];
    //Establish true/false board for win logic
    winBoard = [
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false]
    ];
    //Process mine and numeric logic
    mineIdxGrab();
    minePlace();
    addOne();
    numMines();
    //Establish the win to null
    winner = null;
    gameOver.setAttribute('style', 'visibility: hidden;');
    //Invoke render()
    render();
};

//Render
function render() {
    //Update win based on mine or no mine clicked
    checkWinLose();
    for(i = 0; i < winBoard.length; i++) {
        for(j = 0; j < winBoard[i].length; j++) {
            isWin = winBoard.every(function (){
                return isWin;
            });
            if(isWin === true) {
                winner = youWin;
            };
        };
    };
    //Update the mines remaining based on the last action
    numMines();
};

//Randomize indices for mines
function mineRando(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Creating an Array of indices and storing them for placement
function mineIdxGrab() {
    for(let i=0; i < 10; i++) {
        let mine = [mineRando(0,8), mineRando(0,8)];
        mineIdx.push(mine);
    };
};

//Placing mines throughout the board from the mineIdx array
function minePlace() {
    for(i=0; i < mineIdx.length; i++) {
        board[mineIdx[i][0]][mineIdx[i][1]] = -1;
        winBoard[mineIdx[i][0]][mineIdx[i][1]] = true;
    };
};

//Checking where in the board there is a mine and adding 1 to the 
//value of all surrounding tiles
function addOne() {
    console.log(board)
    //FOR for both row and column iteration location
    for(i=0; i < board.length; i++) {
        for(j=0; j < board[i].length; j++) {
            //IF the iteration at [i][j] is a mine
            if (board[i][j] === -1) {
                //Checking directionals N and NE
                if(board[i - 1]) {
                    board[i - 1][j] !== -1 ? board[i - 1][j] += 1 : '';
                    board[i - 1][j + 1] !== -1 ? board[i - 1][j + 1] += 1 : '';
                    //Checking directional NW
                    if(j !== 0) {
                        board[i - 1][j - 1] !== -1 ? board[i - 1][j - 1] += 1 : '';
                    };
                };
                //Checking directionals S and SE
                if(board[i + 1]) {
                    board[i + 1][j] !== -1 ? board[i + 1][j] += 1 : '';
                    board[i + 1][j + 1] !== -1 ? board[i + 1][j + 1] += 1 : '';
                    //Checking directional SW
                    if(j !== 0) {
                        board[i + 1][j - 1] !== -1 ? board[i + 1][j - 1] += 1 : '';
                    };
                };
                //Checking directionals E and W
                board[i][j + 1] !== -1 ? board[i][j + 1] += 1 : '';
                if(j !== 0) {
                    board[i][j - 1] !== -1 ? board[i][j - 1] += 1 : '';
                };
            };
        };
    };
};

//Set up the timer start and stop functions
function timerClock() {
    // timerFunc  = setInterval(timerClock, 1000);
    document.querySelector('.timer').innerHTML = begin;
    begin++;
}

function timerStop() {
    clearInterval(timerFunc);
}

//Display number of mines on the board
function numMines() {
    mines = mineIdx.length;
    document.querySelector('.mines').innerHTML = mines;
}

//Disable On Context Menu and place a flag on right click/control-click
document.oncontextmenu = function(e) {
    e.target.setAttribute('style', 'background-image: url(https://i.imgur.com/5ONOFFi.png); background-size: cover;')
    mineIdx.pop();
    render();
    return false;
};

//Sequence to randomize one of three failure messages
function youLose(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Win message logic
function checkWinLose() {
    if(winner === loser) {
        timerStop();
        document.getElementById('board').removeEventListener('click', tileSelect);
        gameOver.setAttribute('style', 'visibility: visible;')
        gameOver.innerHTML = lose[youLose(1,4)];
    } else if(winner === youWin) {
        timerStop();
        document.getElementById('board').removeEventListener('click', tileSelect);
        gameOver.setAttribute('style', 'visibility: visible;')
        gameOver.innerHTML = 'And hast thou slain the Jabberwock? O frabjous day! Callooh! Callay!';
    }
}

//Creating recursive 0 scan to open the void
function checkAround(x,y) {
    x = Number(x);
    y = Number(y);
    const validSpots = [];
    if(x > 0 && y > 0) validSpots.push([x - 1, y - 1]);
    if(x > 0) validSpots.push([x - 1, y]);
    if(x > 0 && y < 8) validSpots.push([x - 1, y + 1]);
    if(y > 0) validSpots.push([x, y - 1]);
    if(y < 8) validSpots.push([x, y + 1]);
    if(x < 8 && y > 0) validSpots.push([x + 1, y - 1]);
    if(x < 8) validSpots.push([x + 1, y]);
    if(x < 8 && y < 8) validSpots.push([x + 1, y + 1]);
    return validSpots;
};

function zeroVoid(clIdxRow,clIdxCol) {
    // Return if this cell is already revealed
    if (checked.some(arr => arr[0] === clIdxRow && arr[1] === clIdxCol)) return;
    checked.push([clIdxRow,clIdxCol]);
    if(board[clIdxRow][clIdxCol] > 0){
        boardElem[clIdxCol][clIdxRow].innerText = board[clIdxRow][clIdxCol];
        winBoard[clIdxRow][clIdxCol] = true;
        return;
    } else {
        if(board[clIdxRow][clIdxCol] === 0) {
            boardElem[clIdxCol][clIdxRow].setAttribute('style', 'background-color: rgba(39,38,52, .6)');
            winBoard[clIdxRow][clIdxCol] = true;
            let neighbors = checkAround(clIdxRow,clIdxCol);
            // Recursively call zeroVoid
            neighbors.forEach(n => zeroVoid(n[0], n[1]));
        };
    };
};

