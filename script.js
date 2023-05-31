const gameContainer = document.getElementsByClassName("game-container");

const gameBoard = (() => {
    //filled out manually for visibility for now
    let board = [
        ["o", "x", "o"],
        ["o", "x", ""],
        ["", "x", ""]
    ];

    const renderBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                //creates a reference number for each cell
                //first digit is row, second column
                let rowIndex = board.indexOf(board[i]);
                let columnIndex = board.indexOf(board[j]);
                let cellIndex = rowIndex.toString() + columnIndex.toString();
                //console.log(board[i][j]);
                let square = document.createElement('button');
                square.classList.add(`button${cellIndex}`);
                gameContainer[0].appendChild(square);
                square.textContent = board[i][j];
                //console.log(board.indexOf(board[j]))
                //console.log(board.indexOf(board[i]))

                
                
            }
        }
    }

    return {
        renderBoard
    }
    //console.table(board)
})();


gameBoard.renderBoard()

const Player = (name, mark, playerTurn) => {
    return { name, mark, playerTurn};
}

const playerOne = Player('player1', 'x', 1);

const playerTwo = Player('player2', 'o', 0)

//console.log(playerOne)