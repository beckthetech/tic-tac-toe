/*----- constants -----*/
const colors = {
    'null': 'gray',
    '1': 'goldenrod',
    '-1': 'rgb(0, 0, 106)',
}

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*----- app's state (variables) -----*/
let gameState = {

    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    turn: null,
    win: null,
}

let playerState = {
    '1': 'Player 1',
    '-1': 'Player 2',
    prevWinsX: 0,
    prevWinsO: 0,
}

/*----- cached element references -----*/
let buttonEls = document.querySelectorAll('td');
let msgEl = document.querySelector('#msg');
let replayButton = document.querySelector('#replay');
let moveIdx;

/*----- event listeners -----*/
document.querySelectorAll('td').forEach(e => e.addEventListener('click', render));
document.querySelector('#replay').addEventListener('click', init);

/*----- functions -----*/

function render(evt) {
    moveIdx = evt.target.id;
    if (gameState.board[moveIdx] !== null) return;
    if (gameState.win === gameState.turn) return;
    evt.target.style.backgroundColor = colors[gameState.turn];
    play();
}


function play() {
    gameState.board[moveIdx] = gameState.turn;
    msgEl.textContent = `${playerState[gameState.turn * -1]}'s turn!`
    gameState.win = checkWin();
    if (gameState.win === gameState.turn) {
        return;
    } else {
        gameState.turn *= -1;
    }
}

function checkWin() {
    for (let i = 0; i < winCombos.length; i++) {
        if (Math.abs(gameState.board[winCombos[i][0]] + gameState.board[winCombos[i][1]] + gameState.board[winCombos[i][2]]) === 3) {
            msgEl.textContent = `${playerState[gameState.turn]} wins!! Play again?`
            return gameState.turn;
        }
    }
    if (!gameState.board.includes(null)) {
        gameState.win = 't';
        if (gameState.win = 't') {
            msgEl.textContent = `You are evenly matched...Try again with your eyes closed!`
        }
    };
};

function init() {
    gameState.board = new Array(9).fill(null);
    buttonEls.forEach(e => e.style.backgroundColor = colors.null);
    gameState.turn = 1;
    gameState.win = null;
    msgEl.textContent = 'Welcome to Tic-Tac-To! Player 1 starts...'
    //add win to winner.prevwin
}

init();