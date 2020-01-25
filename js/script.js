var board, game = new Chess();

var minimaxRoot = function (depth, game, isMaximisingPlayer) {

  var newGameMoves = game.moves();
  var bestMove = -9999;
  var bestMoveFound;
  
    for (var i = 0; i < newGameMoves.length; i++) {
      var newGameMove = newGameMoves[i]
      game.move(newGameMove);
      var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
      game.undo();
      if (value >= bestMove) {
        bestMove = value;
        bestMoveFound = newGameMove;
      }
  }
  return bestMoveFound;
};

var minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
  positionCount++;
  if (depth === 0) {
    return -evaluateBoard(game.board());
  }
  var newGameMoves = game.moves();
  if (isMaximisingPlayer) {
    var bestMove = -9999;
    for (var i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
      game.undo();
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  } else {
    var bestMove = 9999;
    for (var i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
      game.undo();
      beta = Math.min(beta, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
  return bestMove;
  }
};

var evaluateBoard = function (board) {
  var totalEvaluation = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
    }
  }
  return totalEvaluation;
};

var reverseArray = function (array) {
  return array.slice().reverse();
};

var pawnEvalWhite = [
  [00,  00,  00,  00,  00,  00,  00, 00],
  [50,  50,  50,  50,  50,  50,  50, 50],
  [10,  10,  20,  30,  30,  20,  10, 10],
  [05,  05,  10,  25,  25,  10,  05, 05],
  [00,  00,  00,  20,  20,  00,  00, 00],
  [05, -05, -10,  00,  00, -10, -05, 05],
  [05,  10,  10, -20, -20,  10,  10, 05],
  [00,  00,  00,  00,  00,  00,  00, 00]
];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =[
  [-50, -40, -30, -30, -30, -30, -40, -50],
  [-40, -20,  00,  00,  00,  00, -20, -40],
  [-30,  00,  10,  15,  15,  10,  00, -30],
  [-30,  05,  15,  20,  20,  15,  05, -30],
  [-30,  00,  15,  20,  20,  15,  00, -30],
  [-30,  05,  10,  15,  15,  10,  05, -30],
  [-40, -20,  00,  05,  05,  00, -20, -40],
  [-50, -40, -30, -30, -30, -30, -40, -50]
];

var bishopEvalWhite = [
  [-20, -10, -10, -10, -10, -10, -10, -20],
  [-10,  00,  00,  00,  00,  00,  00, -10],
  [-10,  00,  05,  10,  10,  05,  00, -10],
  [-10,  05,  05,  10,  10,  05,  05, -10],
  [-10,  00,  10,  10,  10,  10,  00, -10],
  [-10,  10,  10,  10,  10,  10,  10, -10],
  [-10,  05,  00,  00,  00,  00,  05, -10],
  [-20, -10, -10, -10, -10, -10, -10, -20]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
  [ 00, 00, 00, 00, 00, 00, 00,  00],
  [ 05, 10, 10, 10, 10, 10, 10,  05],
  [-05, 00, 00, 00, 00, 00, 00, -05],
  [-05, 00, 00, 00, 00, 00, 00, -05],
  [-05, 00, 00, 00, 00, 00, 00, -05],
  [-05, 00, 00, 00, 00, 00, 00, -05],
  [-05, 00, 00, 00, 00, 00, 00, -05],
  [ 00, 00, 00, 05, 05, 00, 00,  00]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
  [-20, -10, -10, -05, -05, -10, -10, -20],
  [-10,  00,  00,  00,  00,  00,  00, -10],
  [-10,  00,  05,  05,  05,  05,  00, -10],
  [-05,  00,  05,  05,  05,  05,  00, -05],
  [ 00,  00,  05,  05,  05,  05,  00, -05],
  [-10,  05,  05,  05,  05,  05,  00, -10],
  [-10,  00,  05,  00,  00,  00,  00, -10],
  [-20, -10, -10, -05, -05, -10, -10, -20]
];

var kingEvalWhite = [

  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-20, -30, -30, -40, -40, -30, -30, -20],
  [-10, -20, -20, -20, -20, -20, -20, -10],
  [ 20,  20,  00,  00,  00,  00,  20,  20],
  [ 20,  30,  10,  00,  00,  10,  30,  20]
];

var kingEvalBlack = reverseArray(kingEvalWhite);

var getPieceValue = function (piece, x, y) {
  if (piece === null) {
    return 0;
  }
  var getAbsoluteValue = function (piece, isWhite, x, y) {
    if (piece.type === 'p') {
      return 100 + (isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
    } else if (piece.type === 'r') {
      return 500 + (isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
    } else if (piece.type === 'n') {
      return 300 + knightEval[y][x];
    } else if (piece.type === 'b') {
      return 300 + (isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x]);
    } else if (piece.type === 'q') {
      return 900 + evalQueen[y][x];
    } else if (piece.type === 'k') {
      return 9000 + (isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
    }
      throw "Unknown piece type: " + piece.type;
  };
  var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x, y);
  return piece.color === 'w' ? absoluteValue : -absoluteValue;
};


var onDragStart = function (source, piece, position, orientation) {
  if (game.game_over() === true || game.in_draw() === true ||
    piece.search(/^b/) !== -1) {
    return false;
  }
};

var makeBestMove = function () {
  var bestMove = getBestMove(game);
  game.move(bestMove);
  board.position(game.fen());
  renderMoveHistory(game.history());
};

var positionCount;
var getBestMove = function (game) {
  if (game.game_over()) {
    alert("Game over");
  }
  positionCount = 0;
  var depth = parseInt($('#search-depth').find(':selected').text());
  var d = new Date().getTime();
  var bestMove = minimaxRoot(depth, game, true);
  var d2 = new Date().getTime();
  var moveTime = (d2 - d);
  var positionsPerS = (positionCount * 1000 / moveTime);
  $('#position-count').text(positionCount + ' positions');
  $('#time').text(moveTime / 1000 + ' seconds');
  $('#positions-per-s').text(parseInt(positionsPerS) + ' positions');
  return bestMove;
};

var renderMoveHistory = function (moves) {
  var historyElement = $('#move-history').empty();
  historyElement.empty();
  for (var i = 0; i < moves.length; i = i + 2) {
    historyElement.append('<span>' + (i/2 + 1) + '. ' + moves[i] + ' ' + (moves[i + 1] ? moves[i + 1] : ' ') + '</span><br>')
  }
  historyElement.scrollTop(historyElement[0].scrollHeight);
};
//test
function displayLoading(bool) {
  if (bool) {
    loading.style.visibility = "visible";
  } else {
    loading.style.visibility = "hidden";
  }
}
var thepiece = 'r';
var onDrop = function (source, target) {
    if(document.getElementById("pawn-promotion-choice").value != "y") {
    var move = game.move({
        from: source,
        to: target,
        promotion: document.getElementById("pawn-promotion-choice").value
    });
  }
    removeGreySquares();
    if (move === null) {
      displayLoading(false);
      return 'snapback';
    } else {
      displayLoading(true);
      setTimeout(function() {
        displayLoading(false);
        chessboard.position(game.fen());
        updateStatus();
      }, 250);
    }
    

    renderMoveHistory(game.history());
    window.setTimeout(makeBestMove, 250);
};
//test
var onSnapEnd = function () {
  board.position(game.fen());
};

var onMouseoverSquare = function (square, piece) {
  var moves = game.moves({
    square: square,
    verbose: true
  });
  if (moves.length === 0) return;
    greySquare(square);
    for (var i = 0; i < moves.length; i++) {
      greySquare(moves[i].to);
    }
};

var onMouseoutSquare = function (square, piece) {
  removeGreySquares();
};

var removeGreySquares = function () {
  $('#board .square-55d63').css('background', '');
};

var greySquare = function (square) {
  var squareEl = $('#board .square-' + square);
  var background = '#a9a9a9';
  if (squareEl.hasClass('black-3c85d') === true) {
    background = '#696969';
  }
  squareEl.css('background', background);
};

var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);

//test
const loading = document.querySelector(".loading");

function displayLoading(bool) {
  if (bool) {
    loading.style.visibility = "visible";
  } else {
    loading.style.visibility = "hidden";
  }
}
//test
