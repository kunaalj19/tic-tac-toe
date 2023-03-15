class TicTacToe {
    constructor() {
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
            [0, 4, 8], [2, 4, 6] // diagonal
        ];
        this.winningCombination = "";
        this.currentPlayer = "1";
        this.playerIcon = "X";
        this.gameOver = false;
        this.cells = document.getElementsByTagName("td");
        this.history = [];
        this.currentIndex = 0;
    }

    togglePlayer() {
        this.currentPlayer = this.currentPlayer === "1" ? "2" : "1";
        this.playerIcon = this.currentPlayer === "1" ? "X" : "O";
    }

    playTurn(cellId) {
        if(this.board[cellId] === "" && !this.gameOver) {
            this.history.push(this.board.slice());
            this.board[cellId] = this.playerIcon;
            let cell = document.getElementById(cellId);
            cell.innerHTML = this.playerIcon;
            cell.classList.add("selected");
            if(this.checkIfGameHasEnded()) {
                this.winningCombination.forEach(element => {
                    document.getElementById(element).classList.add("won");
                });
                this.displayReviewButtonsInUI();
                this.history.push(this.board.slice());
                this.currentIndex = this.history.length-1;
            } else {
                this.togglePlayer();
                this.updateCurrentPlayerInUI();
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
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.winningCombination = "";
        this.currentPlayer = "1";
        this.playerIcon = "X";
        this.gameOver = false;
        this.history = [];
        this.currentIndex = history.length;
        for(let cell of cells) {
            cell.innerHTML="";
            cell.classList.remove("selected");
            cell.classList.remove("won");
        }
        this.updateCurrentPlayerInUI();
    }

    previousState() {
        if(this.currentIndex > 0 && this.currentIndex <= this.history.length) {
            this.currentIndex = this.currentIndex - 1;
            this.board = this.history[this.currentIndex];
            this.updateGrid();
        }
    }

    nextState() {
        if(this.currentIndex >= 0 && this.currentIndex < this.history.length - 1) {
            this.currentIndex = this.currentIndex + 1;
            this.board = this.history[this.currentIndex];
            this.updateGrid();
        }
    }

    updateGrid() {
        for(let i = 0; i<this.cells.length; i++) {
            this.cells[i].innerHTML = this.board[i];
        }
    }

    updateCurrentPlayerInUI() {
        document.getElementById("current-player").innerHTML="Current Player: " + this.currentPlayer;
    }

    displayReviewButtonsInUI() {
        document.getElementById("next-button").hidden = false;
        document.getElementById("previous-button").hidden = false;
    }

    updateUIIfCellIsEmpty() {
        for(let cell of cells) {
            if(cell.innerHTML==="") {
                cell.classList.remove("selected");
                cell.classList.remove("won");
            }
        }
    }
}
