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

//Declare timer and clock initialization variables
let timerFunc = setInterval(timerClock, 1000);

let begin = 0;

//Declare number of mines left
let mines;

//Declare win
let winner;

let youWin;

let loser;

//Empty Array for mine logic
let mineIdx = [];

//Arrays for recursive logic
let checked = [];

let validSpots = [];

//End Game Message
let gameOver = document.querySelector('.endGame');

//Cached elements

//Column Arrays of the HTML board elements
const colOneElArr = Array.from(document.querySelectorAll('#colOne > div'));
const colTwoElArr = Array.from(document.querySelectorAll('#colTwo > div'));
const colThreeElArr = Array.from(document.querySelectorAll('#colThree > div'));
const colFourElArr = Array.from(document.querySelectorAll('#colFour > div'));
const colFiveElArr = Array.from(document.querySelectorAll('#colFive > div'));
const colSixElArr = Array.from(document.querySelectorAll('#colSix > div'));
const colSevenElArr = Array.from(document.querySelectorAll('#colSeven > div'));
const colEightElArr = Array.from(document.querySelectorAll('#colEight > div'));
const colNineElArr = Array.from(document.querySelectorAll('#colNine > div'));

//An array of column Arrays creating an accessible board of Elements
const boardElem = [colOneElArr, colTwoElArr, colThreeElArr, colFourElArr, colFiveElArr, colSixElArr, colSevenElArr, colEightElArr, colNineElArr];

//Event Listeners

//Establish a listener/function for every click on every tile
document.getElementById('board').addEventListener('click', tileSelect);
   
function tileSelect(e) {
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
    //Process mine and numeric logic
    mineIdxGrab();
    minePlace();
    addOne();
    numMines();
    //Establish the win to null
    winner = null;
    //Invoke render()
    render();
};

//Render
function render() {
    //Update win based on mine or no mine clicked
    //If mine display lose sequence
    //If win display win sequence
    //If neither continue playing
    //Update the mines remaining based on the last action
    //Realign the mines remaining display pending win-check
    //Update the board based on the last action
    checkWinLose();
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
    let timer = timerFunc;
    document.querySelector('.timer').innerHTML = begin;
    begin++;
    if(tileSelect === true) {
        return timer;
    }
}

function timerStop() {
    clearInterval(timerFunc);
}

//Display number of mines on the board
function numMines() {
    mines = 10;
    document.querySelector('.mines').innerHTML = mines;
}

//Disable On Context Menu and place a flag on right click/control-click
document.oncontextmenu = function(e) {
    e.target.setAttribute('style', 'background-image: url(https://i.imgur.com/5ONOFFi.png); background-size: cover;')
    return false;
}

//Sequence to randomize one of three failure messages
function youLose(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Win logic
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
// function zeroVoid(x, y) {
//     let spots = checkAround(x,y);
//     if(checked.length === 0) checked.push([Number(x), Number(y)]);
//     let newPair = false;
//     function checkForNewPair() {
//         for(let i = 0; i < checked.length; i++) {
//             if(checked[i][0] !== Number(x) && checked[i][1] !== Number(y)) {
//             } else {
//                 return newPair;
//             }
//         }
//         newPair = true;
//         return newPair;
//     }
//     checkForNewPair();
//     debugger;
//     if(newPair) checked.push([Number(x), Number(y)])
//     else return;
//     console.log(checked);
//     if(board[x][y] !== 0) {
//         return;
//     } else {
//         for(let i = 0; i < spots.length; i++) {
//             // for(let j = 0; j < checked.length; j++){
//                 // if(checked[j][0] !== spots[i][0] && checked[j][1] !== spots[i][1]) {
//                     if(board[spots[i][0]][spots[i][1]] === 0) {
//                         console.log('calling zeroVoid ', spots[i][0], spots[i][1]);
//                         // checked.push();
//                         zeroVoid(spots[i][0], spots[i][1]);
//                     }
//                 // }
//             // }
//             console.log(board[spots[i][0]][spots[i][1]]);
//         }
//     };
//     // zeroVoid(x, y);
// }

function checkAround(x,y) {
    x = Number(x);
    y = Number(y);
    // validSpots = [];
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
    checked.push([clIdxRow,clIdxCol]);
    if(board[clIdxRow][clIdxCol] > 0){
        boardElem[clIdxCol][clIdxRow].innerText = board[clIdxRow][clIdxCol];
        return;
    } else {
        if(board[clIdxRow][clIdxCol] === 0) {
            boardElem[clIdxCol][clIdxRow].setAttribute('style', 'background-color: rgba(39,38,52, .6)');
            checkAround(clIdxRow,clIdxCol);
            // if(checked.includes([clIdxRow,clIdxCol]) === false) {
                console.log(validSpots);
                // let temporaryValidSpots = validSpots;
                let temporaryValidSpots = [];
                validSpots.forEach(e => {
                    temporaryValidSpots.push(e);
                })
                debugger;
                // for(i = 0; i < validSpots.length; i++) {
                    while(validSpots.length) {
                        let firstEl = validSpots.pop();
                        if(board[firstEl[0]][firstEl[1]] === 0) {
                        //     zeroVoid(firstEl[0],firstEl[1]);
                        boardElem[firstEl[1]][firstEl[0]].setAttribute('style', 'background-color: rgba(39,38,52, .6)');
                        } else {
                            boardElem[firstEl[1]][firstEl[0]].innerText = board[firstEl[0]][firstEl[1]];
                        };
                    };
                for(i = 0; i < temporaryValidSpots.length; i++) {
                    console.log('hitting ', i)
                    if(board[temporaryValidSpots[i][0]][temporaryValidSpots[i][1]] == 0) {
                        let piece = temporaryValidSpots.shift();
                        zeroVoid(piece[0],piece[1])
                    }
                }
                // };
            // } else {
            //     return;
            // };
        };
    };
};

