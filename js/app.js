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
    }

    togglePlayer() {
        this.currentPlayer = this.currentPlayer === "1" ? "2" : "1";
        this.playerIcon = this.currentPlayer === "1" ? "X" : "O";
    }

    playTurn(cellId) {
        if(this.board[cellId] === "" && !this.gameOver) {
            this.board[cellId] = this.playerIcon;
            let cell = document.getElementById(cellId);
            cell.innerHTML = this.playerIcon;
            cell.classList.add("selected");
            if(this.checkIfGameHasEnded()) {
                this.winningCombination.forEach(element => {
                    document.getElementById(element).classList.add("won");
                });
            } else {
                this.togglePlayer();
                this.updateCurrentPlayerInUI();
            }
        } 
    }

    checkIfGameHasEnded() {
        this.gameOver = false;
        for (let combination of this.winningCombinations) {
            this.gameOver = combination.every(element => this.board[element] === this.playerIcon);
            if (this.gameOver) {
                this.winningCombination = combination;
                break;
            }
        }
        return this.gameOver;
    }

    resetBoard() {
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.currentPlayer = "X";
        for(let cell of cells) {
            cell.innerHTML="";
            cell.classList.remove("selected");
            cell.classList.remove("won");
        }
        this.updateCurrentPlayerInUI();
    }
    
    updateCurrentPlayerInUI() {
        document.getElementById("current-player").innerHTML="Current Player: " + this.currentPlayer;
    }
}
