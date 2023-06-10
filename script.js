//const gameContainer = document.getElementsByClassName(".game-container");
const gameContainer = document.querySelector(".game-container")

const gameBoard = (() => {
    //filled out manually for visibility for now
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const getBoard = () => board;

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
                square.setAttribute("data-index-number", `${cellIndex}`);
                square.setAttribute("data-row", `${rowIndex}`);
                square.setAttribute("data-column", `${columnIndex}`);
                //gameContainer[0].appendChild(square);
                gameContainer.appendChild(square)
                square.textContent = board[i][j];
                //console.log(board.indexOf(board[j]))
                //console.log(board.indexOf(board[i]))

                
                
            }
        }
    }

    //const renderBoard = () => {
    //    board.forEach((row, rowIndex))
    //}

    return {
        renderBoard,
        getBoard
    }
    //console.table(board)
})();


gameBoard.renderBoard()

//const Player = (name, mark, playerTurn) => {
 //   return { name, mark, playerTurn};
//}

//const playerOne = Player('player1', 'x', 1);

//const playerTwo = Player('player2', 'o', 0)

//const players = [playerOne, playerTwo];

//playerOneName = "playerOne"
//playerTwoName = "playerTwo"

//const players = [
   // {
   //     name: playerOneName,
   //     mark: 'x'
   // },
   // {
    //    name: playerTwoName,
   //     mark: 'o'
   // }
//];

//console.log(playerOne)

const gameController = (() => {
    //const board = gameBoard;
    //console.table(board.getBoard())
    //const squares = board.getBoard

    //function that lets players place marks on the board
    //let testIndex = 22;

    //getBoard;

    //(cellIndex, player)

    //const addMark = () => {

        //for (let i = 0; i < board.length; i++) {
        //    for (let j=0; j < board[i].length; j++) {
        //        let squareAttribute = square.getAttribute("data-index-number");
                //console.log(squareAttribute);
        //        console.log("Hi")
        //    }
        //}

        //squares.forEach(row => {
        //    row.forEach(cell => console.log())
        //})
         
    //}

    const board = gameBoard.getBoard();

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

    const addMark = () => {
        const squares = gameContainer.querySelectorAll('button');
        squares.forEach(square => {
            square.addEventListener('click', () => {
                const rowIndex = square.getAttribute("data-row");
                const columnIndex = square.getAttribute("data-column");
                //console.log(rowIndex);
                //console.log(columnIndex);
                if (board[rowIndex][columnIndex] === '') {
                    //board[rowIndex][columnIndex] = playerOne.mark;
                    //square.textContent = playerOne.mark;
                    board[rowIndex][columnIndex] === activePlayer.mark;
                    square.textContent = activePlayer.mark
                    changeTurns()
                    square.disabled = true;

                } else if (board[rowIndex][columnIndex] != '') {
                    //do nothing since square is taken
                    //return;
                    //square.textContent = board[i][j];
                }
            });
        });
    };

    return {
        addMark
    }

    //let testIndex = 22;

    //et testSquare = document.getE
    //let testAttribute = testSquare.getAttribute("data-index-number");
    //console.log(testIndex == testAttribute);

})();

gameController.addMark()