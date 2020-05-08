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

/*--------------------ideas above, code below--------------------*/

//Constants

//Define audio file variables
//Define animation images/files
//Define player structure

//State variables

//Declare board
//Declare timer
//Declare number of mines left
//Declare win

//Cached elements

//Cache score in a variable
//Cache timer in a variable for audio association


//Event Listeners

//Establish a listener/function for every click on every tile
    //Every click function must recursively check all
    //surrounding tiles, establish if a number, mine, or empty
    //and continue checking until complete
//Establish a listener/function for game reset
    //Game reset must call init() to re-render the initial setup
//Establish a listener/function for audio manipulation
    //Audio manipulation function must associate audio controls
    //as well as bridge files to reaction sounds

//Initialization

//Establish the initial scores (0)
//Establish the board as a new/clear game
//Establish the win to null
//Invoke render()

//Render

//Update win based on mine or no mine clicked
    //If mine display lose sequence
    //If win display win sequence
    //If neither continue playing
//Update the mines remaining based on the last action
    //Realign the mines remaining display pending win-check
//Update the board based on the last action
