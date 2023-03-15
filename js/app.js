const BOARD_SIZE = 9;

class TicTacToeUI {
    constructor(game) {
        this.game = game;
        this.tiles = document.getElementsByTagName("td");
        this.winner = document.getElementById("winner");
        this.nextButton = document.getElementById("next-button");
        this.previousButton = document.getElementById("previous-button");
        this.resetButton = document.querySelector(".reset-button");
        this.currentPlayer = document.getElementById("current-player");
        this.addEventListeners();
    }
    
    updateUIForSelectedCell(cellId, playerIcon) {
        let cell = document.getElementById(cellId);
        cell.innerHTML = playerIcon;
        cell.classList.add("selected");
    }
    
    updateUIForWinningCombination(winningCombination) {
        winningCombination.forEach(element => {
            document.getElementById(element).classList.add("won");
        });
    }
    
    updateUIToDisplayReviewButtons() {
        this.nextButton.hidden = false;
        this.previousButton.hidden = false;
    }

    updateUIToEnableOrDisableReviewButtons(currentPosition, totalLength) {
        if(currentPosition === 0) this.previousButton.disabled = true;
        else if(currentPosition === totalLength - 1) this.nextButton.disabled = true;
        else {
            this.nextButton.disabled = false;
            this.previousButton.disabled = false;
        }
    }
    
    updateUIToDisplayWinner(player) {
        this.winner.innerHTML = `Player ${player} won!`;
        this.winner.hidden = false;
    }
    
    updateCurrentPlayerInUI(player) {
        this.currentPlayer.innerHTML=`Current Player: ${player}`;
    }
    
    updateUIToResetBoard() {
        for(let tile of this.tiles) {
            tile.innerHTML="";
            tile.classList.remove("selected");
            tile.classList.remove("won");
        }
        this.winner.hidden = true;
        this.nextButton.hidden = true;
        this.previousButton.hidden = true;
    }
    
    updateUIToDisplaySelectedGrid(board) {
        for(let i = 0; i<this.tiles.length; i++) {
            this.tiles[i].innerHTML = board[i];
        }
    }

    addEventListeners() {
        for(let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].addEventListener("click", () => {
                this.game.playTurn(i);
            });
        }
  
        this.resetButton.addEventListener("click", () => {
          this.game.resetBoard();
        });
        
        this.nextButton.addEventListener("click", () => {
          this.game.nextState();
        });
  
        this.previousButton.addEventListener("click", () => {
          this.game.previousState();
        });
    }

}

class TicTacToe {
    constructor() {
        this.board = Array(BOARD_SIZE).fill("");
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
            [0, 4, 8], [2, 4, 6] // diagonal
        ];
        this.winningCombination = "";
        this.currentPlayer = "1";
        this.playerIcon = "X";
        this.gameOver = false;
        this.history = [];
        this.currentIndex = 0;
        this.ui = new TicTacToeUI(this);
    }

    togglePlayer() {
        this.currentPlayer = this.currentPlayer === "1" ? "2" : "1";
        this.playerIcon = this.currentPlayer === "1" ? "X" : "O";
    }

    playTurn(cellId) {
        if(this.board[cellId] === "" && !this.gameOver) {
            this.history.push(this.board.slice());
            this.board[cellId] = this.playerIcon;
            this.ui.updateUIForSelectedCell(cellId, this.playerIcon);
            if(this.checkIfGameHasEnded()) {
                this.ui.updateUIForWinningCombination(this.winningCombination);
                this.ui.updateUIToDisplayReviewButtons();
                this.history.push(this.board.slice());
                this.currentIndex = this.history.length-1;
                this.ui.updateUIToEnableOrDisableReviewButtons(this.currentIndex, this.history.length);
                this.ui.updateUIToDisplayWinner(this.currentPlayer);
            } else {
                this.togglePlayer();
                this.ui.updateCurrentPlayerInUI(this.currentPlayer);
            }
        } 
    }

    checkIfGameHasEnded() {
        this.gameOver = false;
        this.winningCombination = this.winningCombinations.find( combination => 
            combination.every(element => this.board[element] === this.playerIcon)
        );
        this.gameOver = !!this.winningCombination;
        return this.gameOver;
    }

    resetBoard() {
        this.board = Array(BOARD_SIZE).fill("");
        this.winningCombination = "";
        this.currentPlayer = "1";
        this.playerIcon = "X";
        this.gameOver = false;
        this.history = [];
        this.currentIndex = 0;
        this.ui.updateUIToResetBoard();
        this.ui.updateCurrentPlayerInUI(this.currentPlayer);
    }

    previousState() {
        if(this.currentIndex > 0 && this.currentIndex <= this.history.length) {
            this.currentIndex = this.currentIndex - 1;
            this.board = this.history[this.currentIndex];
            this.ui.updateUIToDisplaySelectedGrid(this.board);
            this.ui.updateUIToEnableOrDisableReviewButtons(this.currentIndex, this.history.length);
        }
    }

    nextState() {
        if(this.currentIndex >= 0 && this.currentIndex < this.history.length - 1) {
            this.currentIndex = this.currentIndex + 1;
            this.board = this.history[this.currentIndex];
            this.ui.updateUIToDisplaySelectedGrid(this.board);
            this.ui.updateUIToEnableOrDisableReviewButtons(this.currentIndex, this.history.length);
        }
    }
}

const game = new TicTacToe();   
