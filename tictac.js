var Game = function () {
  this.board = [ [" "," "," "], [" "," "," "], [" "," "," "] ];
  this.currentPlayer = 1
}
  
Game.prototype.run = function () {
  var board = this.board;
  this.currentPlayer = 1;
  setUpMouseListeners();
  initBoard();
  
  function initBoard(){
    this.board = [ [" "," "," "], [" "," "," "], [" "," "," "] ];
    
    var canvas = document.getElementById('canvas'); 
    var c = canvas.getContext('2d'); 
    
    c.moveTo(200,0);
    c.lineTo(200,600);
    c.moveTo(400,0);
    c.lineTo(400,600);
    c.moveTo(0,200);
    c.lineTo(600,200);
    c.moveTo(0,400);
    c.lineTo(600,400);
    c.lineWidth = 10;
    c.strokeStyle = 'black';
    c.stroke();
  }
  function playerTurn(move) { 
    showBoard(board);
    var xcord = parseInt(move[1]);
    var ycord = parseInt(move[0]);
      
    if(this.currentPlayer === 1){
      if(board[xcord][ycord] == " "){
        board[xcord][ycord] = "X";
        showBoard(board);
      }else{
        playerTurn(this.currentPlayer);
      };
    }else{
      if(board[xcord][ycord] == " "){
        board[xcord][ycord] = "O";
        showBoard(board);
      }else{
        playerTurn(this.currentPlayer);
      };
    };
      
    if (won(board)) {
      showBoard(board);
      alert("Winner!");
      return;
    } else if (tied(board)){
      var ans = confirm("We have a tie. Press okay to play again");
      if(ans == true){
        location.reload();
      }
    }
    else {
      (this.currentPlayer === 1) ? this.currentPlayer = 0 : this.currentPlayer = 1;
    }
  };

  function tied(board){
    var tied = true
    for (var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        if(board[i][j] === " "){
          tied = false;
        }
      }
    }
    return tied;
  }
  
  function won(board){
    var rboard = board.slice();
    rboard = rboard.transpose();
    var diag1 = [board[0][0], board[1][1], board[2][2]];
    var diag2 = [board[2][0], board[1][1], board[0][2]];
    console.log(board)
    if ((board[0] == "X,X,X" || board[0] == "O,O,O") ||
    (rboard[0] == "X,X,X" || rboard[0] == "O,O,O")){
      return true;
    } else if ((board[1] == "X,X,X" || board[1] == "O,O,O") ||
    (rboard[1] == "X,X,X" || rboard[1] == "O,O,O")){
      return true;
    } else if ((board[2] == "X,X,X" || board[2] == "O,O,O") ||
    (rboard[2] == "X,X,X" || rboard[2] == "O,O,O")){
      return true;
    } else if ((diag1 == "X,X,X" || diag1 == "O,O,O") ||
    diag2 == "X,X,X" || diag2 == "O,O,O"){
      return true;
    }else{
      return false;
    }
  }

  function showBoard(board){
    for(var i = 0; i < 3; i++){
      for(var j= 0; j < 3; j++){
        mark = board[j][i];
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "black";
        ctx.font = ""+150+"pt Arial ";
        ctx.fillText(mark, 25 + (i * 200), 175 + (j * 200) );
      }
    }
  }
  
  function setUpMouseListeners(){
    var canvas = document.getElementById('canvas'); 
    var c = canvas.getContext('2d'); 
    
    canvas.addEventListener('mousemove', function(e) {
      var mousePos = getMousePos(canvas, e);
      var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      writeCoords(canvas, message);
    }, false);
  
  
    function writeCoords(canvas, message) {
      var context = canvas.getContext('2d');
      context.clearRect(0, 600, 600, 640);
      context.font = '12pt Calibri';
      context.fillStyle = 'black';
      context.fillText(message, 425, 620);
    }

    function getMousePos(canvas, e) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };  
    }
    
    canvas.addEventListener("click", function (e) {
      var mousePos = getMousePos(canvas, e);
      var coords = [mousePos.x, mousePos.y];
      var arr = []
      for(var i = 0; i < 2; i++){
        if (coords[i] < 200){
          arr[i] = 0;
        }else if(coords[i] > 400){
          arr[i] = 2;
        }else{
          arr[i] = 1;
        }
      }
      playerTurn(arr);
    }
     ,false )    
  }
      
};

Array.prototype.transpose = function() {
  var columns = [];
  for (var i = 0; i < this[0].length; i++) {
    columns.push([]);
  }
  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j < this[i].length; j++) {
      columns[j].push(this[i][j]);
    }
  }
  return columns
};
