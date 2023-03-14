let board = ["", "", "", "", "", "", "", "", ""];
let cells = document.getElementsByTagName("td");

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
];

let winningCombination = "";
let currentPlayer = "1";
let playerIcon = "X";
let gameOver = false;

function togglePlayer() {
    currentPlayer = currentPlayer === "1" ? "2" : "1";
    playerIcon = currentPlayer === "1" ? "X" : "O"
}

function playTurn(cellId) {
    if(board[cellId] === "" && !gameOver) {
        console.log(gameOver);
        board[cellId] = playerIcon;
        let cell = document.getElementById(cellId);
        cell.innerHTML = playerIcon;
        cell.classList.add("selected");
        if(checkIfGameHasEnded()) {
            winningCombination.forEach(element => {
                document.getElementById(element).classList.add("won");
            });
            //alert("Player " + currentPlayer + " has won");
        } else {
            togglePlayer();
            updateCurrentPlayer();
        }
    } 
}

function checkIfGameHasEnded() {
    gameOver = false;
    for (let combination of winningCombinations) {
        gameOver = combination.every(element => board[element] === playerIcon);
        if (gameOver) {
            winningCombination = combination;
            break;
        }
    }
    return gameOver;
}

function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    for(let cell of cells) {
        cell.innerHTML="";
        cell.classList.remove("selected");
        cell.classList.remove("won");
    }
    updateCurrentPlayer();
}

function updateCurrentPlayer() {
    document.getElementById("current-player").innerHTML="Current Player: " + currentPlayer;
}