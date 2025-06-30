/*-------------------------------- Constants --------------------------------*/
const winnerCombos =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', '']
let turn = "X"
let winner 
let tie 
let message

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector("#message");
const resetBtnEl =document.querySelector("#reset")



/*-------------------------------- Functions --------------------------------*/
function init(){
    board= ['', '', '', '', '', '', '', '', '']
    turn ="X"
    winner = false
    tie = false
    render()

}

function render(){
    updateBoard()
    updateMessage()
}


function updateBoard(){
    board.forEach((value, index) => {
        squareEls[index].textContent = value;
  });

}


function updateMessage(){
    if(winner === false && tie === false){
        messageEl.textContent = `It's ${turn}'s turn`
    }
    else if(winner === false && tie === true){
        messageEl.textContent = "It's a tie!"
    }
    else if(winner === true){
        messageEl.textContent = `${turn} wins!`
    }
}


function handleClick (event){
    const squrareIndex = parseInt(event.target.id);
    if(board[squrareIndex] !=='' || winner){
        return;
    } 

    plasePiece(squrareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

function plasePiece (index){
    board[index] = turn
}
function checkForWinner(){
 
  for (let i = 0; i < winnerCombos.length; i++) {
    const [a, b, c] = winnerCombos[i];

    if (board[a] !== '' &&  board[a] === board[b] && board[a] === board[c]) 
    {
      winner = true;              
      return
    }
  }
}

function checkForTie(){
  if (!winner && !board.includes("")) {
        tie = true;
  }

}

function switchPlayerTurn(){
    if (winner){
        return
    }
    turn = (turn ==='X') ? 'O' : 'X'
}





/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(function (sqr) {
  sqr.addEventListener('click', handleClick);
});
resetBtnEl.addEventListener('click',init)


init()
