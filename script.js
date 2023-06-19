const gameContainer = document.querySelector(".game-container");
const gameMessage = document.querySelector(".message");
const squares = gameContainer.querySelectorAll('button');

const gameBoard = (() => {
    //filled out manually for visibility for now
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];


    const winMessage = () => {
        gameMessage.textContent = `${winningMark} won`;
    }

    const disableBtns = (squares) => {
        squares.forEach(square => {
            square.disabled = true;
        })
};

    //if marks are the same in one of the winning combinations "you won"
    const winConditions = (board) => {
        if (board.includes("")) {
            //do nothing
        } else {
            //winnning horizontally
            if (board[0][0] != "" && board[0][0] == board[0][1] && board[0][1] == board[0][2]) {
                winningMark = board[0][0]
                wonGame = true;
                winMessage()
                //disableBtns()
                //alert(`${winningMark} won`)

            } else if (board[1][0] != "" && board[1][0] == board[1][1] && board[1][1] == board[1][2]) {
                winningMark = board[1][0]
                wonGame = true;
                winMessage()
                //alert(`${winningMark} won`)
            } else if (board[2][0] != "" && board[2][0] == board[2][1] && board[2][1] == board[2][2]) {
                winningMark = board[2][0]
                wonGame = true;
                winMessage()
                //alert(`${winningMark} won`)
            //winning vertically
            } else if (board[0][0] != "" && board[0][0] == board[1][0] && board[1][0] == board[2][0]) {
                winningMark = board[0][0]
                wonGame = true;
                winMessage()
                //alert(`${winningMark} won`)
            } else if (board[0][1] != "" && board[0][1] == board[1][1] && board[1][1] == board[2][1]) {
                winningMark = board[0][1]
                wonGame = true;
                winMessage()
                //alert(`${winningMark} won`)
            } else if (board[0][2] != "" && board[0][2] == board[1][2] && board[1][2] == board[2][2]) {
                winningMark = board[0][2]
                wonGame = true;
                winMessage()
                //alert(`${winningMark} won`)
            //winning diagonally
            } else if (board[0][0] != "" && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
                winningMark = board[0][0]
                wonGame = true;
                winMessage()
                //alert(`${winningMark} won`)
            } else if (board[2][0] != "" && board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
                winningMark = board[2][0]
                wonGame = true;
                winMessage()
                //alert(`${winningMark} won`)
            }
        }
    }

    //winning horizontally
    //[0][0],[0][1],[0][2]
    //[1][0],[1][1],[1][2]
    //[2][0],[2][1],[2][2]
    //winning vertically
    //[0][0],[1][0],[2][0]
    //[0][1],[1][1],[2][1]
    //[0][2],[1][2],[2][2]
    //winning diagonally
    //[0][0],[1][1],[2][2]
    //[2][0],[1][1],[0][2]

    const tieConditions = (board) => {

            let tieArray = [];

            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] != "") {
                        tieArray.push(board[i][j])
                    } else {
                        //do nothing
                    }
                }
            }

            if (tieArray.length === 9) {
                isTie = true;
                gameMessage.textContent = "It's a tie"
                //alert("it's a tie");
            } else {
                //do nothing
            }

            
    }


    const getBoard = () => board;

    const renderBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                //creates a reference number for each cell
                //first digit is row, second column
                let rowIndex = board.indexOf(board[i]);
                let columnIndex = board.indexOf(board[j]);
                let cellIndex = rowIndex.toString() + columnIndex.toString();
              
                let square = document.createElement('button');
                square.classList.add(`button${cellIndex}`);
                square.setAttribute("data-index-number", `${cellIndex}`);
                square.setAttribute("data-row", `${rowIndex}`);
                square.setAttribute("data-column", `${columnIndex}`);

                gameContainer.appendChild(square)
                square.textContent = board[i][j];

                
                
            }
        }
    }



    return {
        renderBoard,
        getBoard,
        winConditions,
        tieConditions
    }
})();


gameBoard.renderBoard()


const gameController = (() => {
    

    let board = gameBoard.getBoard();

//will be used to announce the winner
    let wonGame = false;

    let winningMark = "";

    let isTie;

    const checkWin = () => gameBoard.winConditions(board);

    const checkTie = () => gameBoard.tieConditions(board);
    

    //const players = [playerOne, playerTwo];

    playerOneName = "playerOne"
    playerTwoName = "playerTwo"

    const players = [
       {
        name: playerOneName,
        mark: 'x'
      },
      {
        name: playerTwoName,
        mark: 'o'
      }
   ];

    let activePlayer = players[0];

    const changeTurns = () => {
        if (activePlayer == players[0]) {
            activePlayer = players[1];
        } else if (activePlayer == players[1]) {
            activePlayer = players[0]
        }
    };

//to fix
const gameCommentary = () => {
    gameMessage.innerHTML = `It's ${activePlayer.name}'s turn`
    //winningMark;

    if (winningMark == "x" || winningMark == "o") {
        gameMessage.innerHTML = `Player ${winningMark} won.`
    } else {
        //do nothing
    }
}

//need to fix this
const disableBtns = (squares) => {
    squares.forEach(square => {
        square.disabled = wonGame;
    })
}

//const squares = gameContainer.querySelectorAll('button');
const squares = gameContainer.querySelectorAll('button');

    const addMark = () => {
        squares.forEach(square => {
            square.addEventListener('click', () => {
                const rowIndex = square.getAttribute("data-row");
                const columnIndex = square.getAttribute("data-column");

                if (board[rowIndex][columnIndex] === '') {
                    
                    board[rowIndex][columnIndex] = activePlayer.mark;
                    square.textContent = activePlayer.mark
                    
                    //for checking if the board array updates after each move
                    let currentBoard = gameBoard.getBoard();
                    //console.table(currentBoard)
                    
                    checkWin();
                    if(!wonGame) {
                        checkTie();
                    }

                    disableBtns(squares)
                    //gameCommentary();
                    changeTurns();

                    //will have to find a solution to stop "it's a tie"
                    //in a rare case where the button that makes you win
                    // is the last one
                    //if(wonGame === false && winningMark === "") {
                    //    checkTie();
                    //}
                    //if(!wonGame) {
                    //    checkTie();
                    //}
                    //console.log(board)
                    
                    
                    square.disabled = true;

                } else if (board[rowIndex][columnIndex] != '') {
                    //do nothing since square is taken
                }
            });
        });
    };


//reset game

const resetBtn = document.querySelector(".reset");

const resetGame = () => {
    resetBtn.addEventListener("click", () => {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];

        squares.forEach(square => {
            square.textContent = ""
            square.disabled = false;
        })

        gameMessage.textContent = "";

        activePlayer = players[0];
        wonGame = false;
        winningMark = "";
        isTie = "";

    })
}

    return {
        addMark,
        resetGame
    }

})();

//gameController.gameCommentary()
gameController.addMark()
gameController.resetGame()