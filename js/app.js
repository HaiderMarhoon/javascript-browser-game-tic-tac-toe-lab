/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', '']
let turn = ["X","O",""]
let winner 
let tie 
let message
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


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector("#message")



/*-------------------------------- Functions --------------------------------*/
function init(event){
    board= ['', '', '', '', '', '', '', '', '']
    turn ="X"
    winner = false
    tie = false
    render()
    handleClick()

}

function updateBoard(){
    board.forEach((turn, index) => {
    squareEls[index].textContent = turn;
  });

}

function updateMessage(){
    if(winner === false && tie === false){
        messageEl.textContent =` the turn ${turn}`
    }
    else if(winner === false && tie === true){
        messageEl.textContent = "it is tie"
    }
    else if(winner === true){
        messageEl.textContent = "Winner"
    }
}

function render(){
    updateBoard()
    updateMessage()
}

function handleClick (event){
    const squrareIndex = parseInt(event.target.id);
    if(board[squrareIndex] === "X" || board[squrareIndex] === "O" || winner){
        return;
    } 
    board[squrareIndex] = turn;
    plasePiece(squrareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
}

function plasePiece (index){
    board[index] = turn
}
function checkForWinner(){
 
  for (let i = 0; i < winnerCombos.length; i++) {
    const [a, b, c] = winnerCombos[i];

    if (
      board[a] !== '' &&           // Check if first spot is not empty
      board[a] === board[b] &&     // Check if first equals second
      board[a] === board[c]        // Check if first equals third
    ) 
    {
      winner = true;               // We have a winner!
      return
    }

  }
}
 function checkForTie(){
    if(winner){
        return
    }
    else if(board === ""){
        tie = false
    }
    else {
        tie = true
    }
 }

function switchPlayerTurn(){
    if (winner !== false){
        return
    }
    else if( winner === false){
        if(turn === "X"){
            turn === "O"
        }
        else if(turn === "O"){
            turn === "X"
        }
    }
}





/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(function (sqr) {
  sqr.addEventListener('click', handleClick);
});

messageEl.addEventListener('click',message)

