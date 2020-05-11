//Welcome message/Rules/gameplay instructions message

//Selection of board size (9x9/10, 16x16/40, 16x30/99)

//A start button

//A timer

//Number of mines left

//Log high scores with window.localStorage

//Interval beeps or timer notifications on milestone times

//Render the board based on size selected

//Randomize the board/mines

//Recursive click logic

/*-----------------ideas above, pseudocode below-----------------*/

//Constants

//Define audio file variables
//Define animation images/files
//Define player structure?
let lose = {
    '1': 'The Jabberwock caught you in its claws and bit you with its jaws!',
    '2': 'The Jubjub bird swooped down and plucked you from the ground!',
    '3': 'You have become the latest catch of the frumious Bandersnatch!'
}

//State variables

//Declare board
let board;
//Declare timer
// let timer = new Date.now().getTime();
// let mins = Math.floor((1000 * 60 * 60) / (1000 * 60));
// let secs = Math.floor((1000 * 60) / 1000);
//Declare number of mines left
let mines = 0;
//Declare win
let winner;

let mineIdx = [];

//Cached elements

//Cache score in a variable
//Cache timer in a variable for audio association?

// const boardElem = document.querySelector('#board');

const colOneElArr = Array.from(document.querySelectorAll('#colOne > div'));
const colTwoElArr = Array.from(document.querySelectorAll('#colTwo > div'));
const colThreeElArr = Array.from(document.querySelectorAll('#colThree > div'));
const colFourElArr = Array.from(document.querySelectorAll('#colFour > div'));
const colFiveElArr = Array.from(document.querySelectorAll('#colFive > div'));
const colSixElArr = Array.from(document.querySelectorAll('#colSix > div'));
const colSevenElArr = Array.from(document.querySelectorAll('#colSeven > div'));
const colEightElArr = Array.from(document.querySelectorAll('#colEight > div'));
const colNineElArr = Array.from(document.querySelectorAll('#colNine > div'));

const boardElem = [colOneElArr, colTwoElArr, colThreeElArr, colFourElArr, colFiveElArr, colSixElArr, colSevenElArr, colEightElArr, colNineElArr];

//Event Listeners

//Establish a listener/function for every click on every tile
document.getElementById('board').addEventListener('click', tileSelect);
    //Every click function must recursively check all
    //surrounding tiles, establish if a number, mine, or empty
    //and continue checking until complete
function tileSelect(e) {
    let clIdxRow = e.target.getAttribute('row');
    let clIdxCol = e.target.getAttribute('col');
    if (board[clIdxRow][clIdxCol] !== -1){
        boardElem[clIdxCol][clIdxRow].innerText = board[clIdxRow][clIdxCol];
    } else {
        winner = lose[youLose(1,4)];
        console.log(winner);
    }
    render();
}

// document.querySelectorAll('.tile').addEventListener('contextmenu', flagClick);

// function flagClick(e) {
//     e.preventDefault();
// }

//Establish a listener/function for game reset
    //Game reset must call init() to re-render the initial setup
//Establish a listener/function for audio manipulation
    //Audio manipulation function must associate audio controls
    //as well as bridge files to reaction sounds

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
    mineIdxGrab();
    minePlace();
    addOne();
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

};

function minePlace() {
    for(i=0; i < mineIdx.length; i++) {
        board[mineIdx[i][0]][mineIdx[i][1]] = -1;
    };
};

function mineIdxGrab() {
    for(let i=0; i < 10; i++) {
        let mine = [mineRando(0,8), mineRando(0,8)];
        mineIdx.push(mine);
    };
};

function mineRando(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function addOne() {
    console.log(board)
    for(i=0; i < board.length; i++) {
        for(j=0; j < board[i].length; j++) {
            if (board[i][j] === -1) {
                if(board[i - 1]) {
                    board[i - 1][j] !== -1 ? board[i - 1][j] += 1 : '';
                    board[i - 1][j + 1] !== -1 ? board[i - 1][j + 1] += 1 : '';
                    if(j !== 0) {
                        board[i - 1][j - 1] !== -1 ? board[i - 1][j - 1] += 1 : '';
                    };
                };
                if(board[i + 1]) {
                    board[i + 1][j] !== -1 ? board[i + 1][j] += 1 : '';
                    board[i + 1][j + 1] !== -1 ? board[i + 1][j + 1] += 1 : '';
                    if(j !== 0) {
                        board[i + 1][j - 1] !== -1 ? board[i + 1][j - 1] += 1 : '';
                    };
                };
                board[i][j + 1] !== -1 ? board[i][j + 1] += 1 : '';
                if(j !== 0) {
                    board[i][j - 1] !== -1 ? board[i][j - 1] += 1 : '';
                };
            };
        };
    };
};

function youLose(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//MINE LOGIC!!! Randomize the mines and have a function run through
//the board. Wherever there is a mine add +1 to all surrounding
//squares. This will auto-generate the void and numbers.
//Cycle through each row/col and place one mine (2 for one of them)
//in order to spread out the mines to avoid clusters

//Win logic - use Math.random() to pull a lose message from the 
//lose object for randomized loss messaging lose[math.random()
//function name]
// if (winner) {
//     winMsg();
// } else {
//     /*randomize the lose sequence with Math.random()*/
// }

// let timerFunc = setInterval(function() {
    
// }, 1000);

// if (timeleft < 0) {
//     document.getElementById(/*endBanner*/).innerHTML = `You did a thing in ${timer}`
//     clearInterval(timerFunc);
//     document.getElementById('#timer').innerHTML = ''
// }

//Creating the absolute element
function winMsg() {
    let winScroll = document.createElement('div');
    winScroll.id = 'abMsg'
    let winMes = document.createTextNode('And hast thou slain the Jabberwock? O frabjous day! Callooh! Callay!');
    winScroll.appendChild(winMes);
    //It's created but how to make it absolute to the board/screen?
}