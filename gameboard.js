const PromptSync = require("prompt-sync");

function initializeGameBoard() {
    const board = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]
    ];
    return board;
}

function printGameBoard(board) {
    console.log(board[0][0] + "|" + board[0][1] + "|" + board[0][2]);
    console.log(board[1][0] + "|" + board[1][1] + "|" + board[1][2]);
    console.log(board[2][0] + "|" + board[2][1] + "|" + board[2][2]);
}


function checkWin(board, currentPlayer) {
    
    const symbols = {
        "Player 1": "X",
        "Player 2": "O"
    };

    const symbol = symbols[currentPlayer];

    // Check Rows
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] === symbol &&
            board[i][1] === symbol &&
            board[i][2] === symbol
        ) {
            return true;
        }
    }

    // Check Columns
    for (let i = 0; i < 3; i++) {
        if (
            board[0][i] === symbol &&
            board[1][i] === symbol &&
            board[2][i] === symbol
        ) {
            return true;
        }
    }

    // Check Diagonals
    if (
        (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) ||
        (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol)
    ) {
        return true;
    }

    return false;
}

function isBoardFull(board) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === "-") {
                return false;
            }
        }
    }
    return true;
}

function main() {
    const board = initializeGameBoard();
    let currentPlayer = "Player 1";

    while (true) {
        printGameBoard(board);
        console.log(`It's ${currentPlayer}'s turn`);
        const prompt = require('prompt-sync')();
        const row = prompt("Enter the row (1 to 3):") - 1;
        const col = prompt("Enter the col (1 to 3):") - 1;

        if (board[row][col] === "-") {
            let currentSymbol = "X";
            if (currentPlayer === "Player 2") {
                currentSymbol = "O";
            }

            board[row][col] = currentSymbol;

            if (checkWin(board, currentPlayer)) {
                printGameBoard(board);
                console.log(`${currentPlayer} wins! Game Over.`);
                break;
            } else if (isBoardFull(board)) {
                printGameBoard(board);
                console.log("It's a draw! Game Over.");
                break;
            }
            else{
            if (currentPlayer === "Player 1") {
                currentPlayer = "Player 2";
            } else {
                currentPlayer = "Player 1";
            }
            }
        } else {
            console.log("Invalid move. Try again");
        }
    }
}

main();
