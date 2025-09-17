function GameBoard(){
    let gameboard = new Array(9).fill('');
    const getGameBoard = () => gameboard;
    const resetGameBoard = () => {
        gameboard.fill('');
    };

    const updateGameBoard = (marker, location) =>{
        if(gameboard[location] == ''){
            gameboard[location] = marker;
            return true;
        }else{
            return false;
        }
    };
    return {getGameBoard, resetGameBoard, updateGameBoard};
}

function Players(name, marker){
    this.name = name;
    this.marker = marker;
    return {name, marker};
}

function Controller(name1, name2){
    let gameboard = new GameBoard();
    let player1 = new Players(name1, "X");
    let player2 = new Players(name2, "O");
    let gameOver = false;
    let gameWinner = null;
    let currentPlayer = player1;

    const WINNING_COMBINATIONS = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    const checkWinner = () =>{
        const board = gameboard.getGameBoard();
        console.log(board);
        for(let pattern of WINNING_COMBINATIONS){
            if (board[pattern[0]] !== '' && board[pattern[0]] === board[pattern[1]] &&
                    board[pattern[1]] === board[pattern[2]]){
                    return true;
                }
        }
        return false;
    }

    const checkDraw = () =>{
        const board = gameboard.getGameBoard();
        for(let tile of board){
            if(tile == ''){
                return false;
            }
        }
        return true;
    }

    const updateBoard = (position, marker) =>{
        if(gameOver){
            return "Game over";
        }
        let result = gameboard.updateGameBoard(marker, position);
        if(result){
            if(checkWinner()){
                if(marker == player1.marker){
                    gameOver = true;
                    gameWinner=player1;
                    return true;
                }else{
                    gameOver = true;
                    gameWinner = player2;
                    return true; 
                }
            };
            if(checkDraw()){
                gameOver = true;
                return true;
            }
            if(marker == player1.marker){
                currentPlayer = player2;
            }else{
                currentPlayer = player1;
            }
            return true;
        }
        else{
            console.log("here");
            return false;
            
        } 
    }

    const resetGame = () =>{
        gameWinner = null;
        gameOver = false;
        currentPlayer = player1;
        gameboard.resetGameBoard();
    }

    const getGameWinner = () => gameWinner;
    const getCurrent = () => currentPlayer;

    return{getGameWinner, getCurrent, checkWinner, checkDraw, updateBoard, resetGame};
}

let newController = new Controller('john', 'james');
let container = document.querySelector(".container");
for(let i=0; i<9;i++){
    let newElement = document.createElement('div');
    newElement.className = "cell";
    newElement.id = `grid-${i}`;
    newElement.addEventListener('click', (e)=>{
        let elementGrids = e.target.id.split("-");
        let currentPlayer = newController.getCurrent().marker;
        if(newController.getGameWinner() === null){
            let result = newController.updateBoard(elementGrids[1], currentPlayer);
            if(result){
                e.target.textContent = currentPlayer;
                console.log(newController.getCurrent());
            }
            if(newController.getGameWinner() !== null){
                console.log(newController.getGameWinner());
            }
        }
    })
    container.appendChild(newElement);
    
}