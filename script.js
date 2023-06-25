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

    //let players = gameController.getPlayers()

    //const winnerPlayer = players.find(winner => winner.mark === winningMark)

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

    //playerOneName = "playerOne"
    //playerTwoName = "playerTwo"

    let playerOneName;
    let playerTwoName;

    const players = [
       {
        name: playerOneName || "Player One",
        mark: 'x'
      },
      {
        name: playerTwoName || "Player Two",
        mark: 'o'
      }
   ];

   const getPlayers = () => players;

    let activePlayer = players[0];

    const changeTurns = () => {
        if (activePlayer == players[0]) {
            activePlayer = players[1];
        } else if (activePlayer == players[1]) {
            activePlayer = players[0]
        }
    };

    const whichWon = (winningMark) => {
        if (winningMark == "x") {
            console.log(`${players[0].name} has won`)
        } else if (winningMark == "o") {
            console.log(`${players[1].name} has won`)
        } else {
            console.log("Keep playing")
        }
    }

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

//FORM DATA
const formContainer = document.getElementById('start-container');
const form = document.getElementsByTagName('form');
const startBtn = document.getElementById('start');

function getPlayerNames () {

    playerOne = document.getElementById('playerone').value
    playerTwo = document.getElementById('playertwo').value

    if (playerOne != "" && playerTwo != "") {
        players[0].name = playerOne;
        players[1].name = playerTwo;
    } else {
        players[0].name = "Player One";
        players[1].name = "Player Two";
    }
}

function hideForm () {
    formContainer.style.display = "none";
}

const mainContainer = document.querySelector('.main-container');

const startGame = () => {
    
    startBtn.addEventListener("click", function() {
        //stop form submission
        event.preventDefault();

        mainContainer.style.display = "flex"
        getPlayerNames()
        console.log(players)
        //console.log(playerOneName)
        //console.log(playerTwoName)
        resetGame()
        hideForm()
    });
}


//const squares = gameContainer.querySelectorAll('button');
const squares = gameContainer.querySelectorAll('button');

//reset game

const resetBtn = document.getElementById("reset");

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
                    whichWon(winningMark);
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


    return {
        addMark,
        //resetGame,
        startGame,
        getPlayers
    }

})();

//gameController.gameCommentary()
gameController.addMark()
//gameController.resetGame()
gameController.startGame()
