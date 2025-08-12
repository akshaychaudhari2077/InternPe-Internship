var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; // keeps track of the current row in each column

window.onload = function () {
    setGame();
};

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setpiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setpiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let c = parseInt(coords[1]);
    let r = currColumns[c];

    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());

    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    currColumns[c] = r - 1;

    checkWinner();
}

function checkWinner() {
    // Horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c <= columns - 4; c++) {
            if (board[r][c] != ' ' &&
                board[r][c] == board[r][c + 1] &&
                board[r][c + 1] == board[r][c + 2] &&
                board[r][c + 2] == board[r][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r <= rows - 4; r++) {
            if (board[r][c] != ' ' &&
                board[r][c] == board[r + 1][c] &&
                board[r + 1][c] == board[r + 2][c] &&
                board[r + 2][c] == board[r + 3][c]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Diagonal (\)
    for (let r = 0; r <= rows - 4; r++) {
        for (let c = 0; c <= columns - 4; c++) {
            if (board[r][c] != ' ' &&
                board[r][c] == board[r + 1][c + 1] &&
                board[r + 1][c + 1] == board[r + 2][c + 2] &&
                board[r + 2][c + 2] == board[r + 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Anti-diagonal (/)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c <= columns - 4; c++) {
            if (board[r][c] != ' ' &&
                board[r][c] == board[r - 1][c + 1] &&
                board[r - 1][c + 1] == board[r - 2][c + 2] &&
                board[r - 2][c + 2] == board[r - 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    winner.innerText = board[r][c] == playerRed ? "Red Wins!" : "Yellow Wins!";
    gameOver = true;
}
