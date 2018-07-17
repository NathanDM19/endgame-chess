
let board = [];
let boardTeam = [];
// Blank - Nothing
// 1 - Black Pawn
// 2 - Black Bishop
// 3 - Black Knight
// 4 - Black Castle
// 5 - Black King
// 6 - Black Queen
// 11 - White Pawn
// 12 - White Bishop
// 13 - White Knight
// 14 - White Castle
// 15 - White King
// 16 - White Queen


let pieceSelected = false;
let legalMoves = [];
let turn = "White";

$('document').ready(function () {
  // Creating board
  for (let i = 0; i < 64; i++) {
    if ((Math.floor(i / 8)) % 2 === 0) {
      if (i % 2 === 0) {
        $('#gameBoard').append(`<div id=${i} class="square odd"></div>`)
      } else {
        $('#gameBoard').append(`<div id=${i} class="square even"></div>`)
      }
    } else {
      if (i % 2 === 0) {
        $('#gameBoard').append(`<div id=${i} class="square even"></div>`)
      } else {
        $('#gameBoard').append(`<div id=${i} class="square odd"></div>`)
      }
    }
    $(`#${i}`).click(function () {
      // Selecting and de-selecting a piece
      if (turn === "White" && board[i] > 10 && board[i] < 17) {
        if (!pieceSelected) {
          $(`#${i}`).css({background: "orange" })
          pieceSelected = i;
          showMoves(i, board[i])
        } else if (pieceSelected === i) {
          pieceSelected = false;
          legalMoves = [];
          for (let j = 0; j < 64; j++) {
            reset(j)
          }
        }
      } else if (turn === "Black" && board[i] > 0 && board[i] < 7) {
        if (!pieceSelected) {
          $(`#${i}`).css({ background: "orange" })
          pieceSelected = i;
          showMoves(i, board[i])
        } else if (pieceSelected === i) {
          pieceSelected = false;
          legalMoves = [];
          for (let j = 0; j < 64; j++) {
            reset(j)
          }
        }
      }
      // Moving a piece
      if (pieceSelected) {
        if (legalMoves.includes(i)) {
          console.log(pieceSelected, i)
          $(`#${pieceSelected}`).html("")
          let piece;
          if (board[pieceSelected] === 12) {
            piece = "Bishop"
          } else if (board[pieceSelected] === 13) {
            piece = "Knight"
          } else if (board[pieceSelected] === 4) {
            piece = "Castle"
          } else if (board[pieceSelected] === 5 || board[pieceSelected] === 15) {
            piece = "King"
          }
          boardTeam[i] = turn;
          board[i] = board[pieceSelected]
          boardTeam[pieceSelected] = null;
          board[pieceSelected] = null;
          $(`#${i}`).html("")
          $(`#${i}`).append(`<img class="piece" src="${turn.toLowerCase()}${piece}.png">`);
          for (let j = 0; j < 64; j++) {
            reset(j)
          }
          legalMoves = [];
          pieceSelected = false;
          if (turn === "White") {
            turn = "Black"
            $('#turn').text("Turn: Black")
          } else {
            turn = "White";
            $('#turn').text("Turn: White")
          }
        }
      }
    })
  }
  // Adding pieces
  $('#3').append('<img class="piece" src="blackCastle.png">')
  board[3] = 4
  boardTeam[3] = "Black";
  $('#18').append('<img class="piece" src="whiteBishop.png">')
  board[18] = 12
  boardTeam[18] = "White";
  $('#21').append('<img class="piece" src="blackKing.png">')
  board[21] = 5
  boardTeam[21] = "Black";
  $('#37').append('<img class="piece" src="whiteKnight.png">')
  board[37] = 13
  boardTeam[37] = "White"
  $('#39').append('<img class="piece" src="whiteKing.png">')
  board[39] = 15
  boardTeam[39] = "White"
  $('#43').append('<img class="piece" src="whiteKnight.png">')
  board[43] = 13
  boardTeam[43] = "White"
})
// Reseting blue squares
function reset(i) {
  if ((Math.floor(i / 8)) % 2 === 0) {
    if (i % 2 === 0) {
      $(`#${i}`).css({ background: "#f9db7a" })
    } else {
      $(`#${i}`).css({ background: "#e4c444" })
    }
  } else {
    if (i % 2 === 0) {
      $(`#${i}`).css({ background: "#e4c444" })
    } else {
      $(`#${i}`).css({ background: "#f9db7a" })
    }
  }
}

function showMoves(square, type) {
  let possibleMove = square;
  // Black Knight
  if (type === 4) {
    // Up
    while (possibleMove >= 8) {
      possibleMove -= 8;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (board[possibleMove] > 10) {
        break;
      }
    }
    possibleMove = square;
    // Down
    while (possibleMove <= 55) {
      possibleMove += 8;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (board[possibleMove] > 10) {
        break;
      }
    }
    possibleMove = square;
    // Left
    while (possibleMove > square - (square % 8)) {
      possibleMove -= 1;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (board[possibleMove] > 10) {
        break;
      }
    }
    possibleMove = square;
    // Right
    while (possibleMove < square + (square % 8 + 1)) {
      possibleMove += 1;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (board[possibleMove] > 10) {
        break;
      }
    }

    // Black and White King
  } else if (type === 5 || type === 15) {
    // Top Left
    if (boardTeam[square - 9] !== turn && square % 8 > 0 && square > 8) {
      $(`#${square - 9}`).css({ background: "blue" })
      legalMoves.push(square - 9)
    }
    // Top Center
    if (boardTeam[square - 8] !== turn && square > 8) {
      $(`#${square - 8}`).css({ background: "blue" })
      legalMoves.push(square - 8)
    }
    // Top Right
    if (boardTeam[square - 7] !== turn && square % 8 < 7 && square > 8) {
      $(`#${square - 7}`).css({ background: "blue" })
      legalMoves.push(square - 7)
    }
    // Center Left
    if (boardTeam[square - 1] !== turn && square % 8 > 0) {
      $(`#${square - 1}`).css({ background: "blue" })
      legalMoves.push(square - 1)
    }
    // Center Right
    if (boardTeam[square + 1] !== turn && square % 8 < 7) {
      $(`#${square + 1}`).css({ background: "blue" })
      legalMoves.push(square + 1)
    }
    // Bottom Left
    if (boardTeam[square + 7] !== turn && square / 8 < 7 && square % 8 > 0) {
      $(`#${square + 7}`).css({ background: "blue" })
      legalMoves.push(square + 7)
    }
    // Bottom Center
    if (boardTeam[square + 8] !== turn && square / 8 < 7) {
      $(`#${square + 8}`).css({ background: "blue" })
      legalMoves.push(square + 8)
    }
    if (boardTeam[square + 9] !== turn && square / 8 < 7 && square % 8 < 7) {
      $(`#${square + 9}`).css({ background: "blue" })
      legalMoves.push(square + 9)
    }

    // White Bishop
  } else if (type === 12) {
    // Up Left
    while (possibleMove % 8 > 0) {
      possibleMove -= 9
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (possibleMove < 8 || board[possibleMove] < 10) {
        break;
      }
    }
    possibleMove = square;
    // Up Right
    while (possibleMove % 8 < 7) {
      possibleMove -= 7;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (possibleMove < 8 || board[possibleMove] < 10) {
        break;
      }
    }
    possibleMove = square;
    // Down Left
    while (possibleMove % 8 > 0) {
      possibleMove += 7;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (possibleMove > 55 || board[possibleMove] < 10) {
        break;
      }
    }
    possibleMove = square;
    // Down Right
    while (possibleMove % 8 < 7) {
      possibleMove += 9;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (possibleMove > 55 || board[possibleMove] < 10) {
        break;
      }
    }

    // White Knight
  } else if (type === 13) {
    // 8 Moves
    // -17, -15, -10, -6, 6, 10, 15, 17
    // Up Left
    if (boardTeam[square - 17] !== "White" && square % 8 > 0 && square / 8 > 2) {
      $(`#${square - 17}`).css({ background: "blue" })
      legalMoves.push(square - 17)
    }
    // Up Right
    if (boardTeam[square - 15] !== "White" && square % 8 < 7 && square / 8 > 2) {
      $(`#${square - 15}`).css({ background: "blue" })  
      legalMoves.push(square - 15)
    }
    // Left Up
    if (boardTeam[square - 10] !== "White" && square % 8 > 1 && square / 8 > 1) {
      $(`#${square - 10}`).css({ background: "blue" })  
      legalMoves.push(square - 10)
    }
    // Right Up
    if (boardTeam[square - 6] !== "White" && square % 8 < 6 && square / 8 > 1) {
      $(`#${square - 6}`).css({ background: "blue" })  
      legalMoves.push(square - 6)
    }
    // Left Down
    if (boardTeam[square + 6] !== "White" && square % 8 > 1 && square / 8 < 7) {
      $(`#${square + 6}`).css({ background: "blue" })  
      legalMoves.push(square + 6)
    }
    // Right Down
    if (boardTeam[square + 10] !== "White" && square % 8 < 6 && square / 8 < 7) {
      $(`#${square + 10}`).css({ background: "blue" })  
      legalMoves.push(square + 10)
    }
    // Down Left
    if (boardTeam[square + 15] !== "White" && square % 8 > 0 && square / 8 < 6) {
      $(`#${square + 15}`).css({ background: "blue" })  
      legalMoves.push(square + 15)
    }
    // Down Right
    if (boardTeam[square + 17] !== "White" && square % 8 < 7 && square / 8 < 6) {
      $(`#${square + 17}`).css({ background: "blue" })  
      legalMoves.push(square + 17)
    }

  }
}