import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chessboard.css';
import PieceSettingsModal from './PieceSettingsModal';
import PauseModal from './PauseModal';
import About from './About';
import { Chessboard } from "react-chessboard";

function WinLoseScreen({ winner, onRestart }) {
  return (
    <div className="win-lose-screen">
      <div className="message">{winner} wins!</div>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
}

function Menu() {
  const [isPaused, setIsPaused] = useState(false);
  const [isAbout, setIsAbout] = useState(false);
  const [isPieceSettingsOpen, setIsPieceSettingsOpen] = useState(false);
  const [board, setBoard] = useState(null);
  const [moveSquares, setMoveSquares] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [winner, setWinner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initialBoard = new chessboard();
    initialBoard.initialize();
    setBoard(initialBoard);
    setIsLoading(false);
  }, []);

  const handlePauseClick = () => {
    setIsPaused(true);
  };

  const handleResumeClick = () => {
    setIsPaused(false);
  };

  const handleResetClick = () => {
    setIsPaused(false);
    setIsPieceSettingsOpen(true);
  };

  const handleAboutClick = () => {
    setIsAbout(true);
    setIsPaused(false);
  };

  const handleExitClick = () => {
    navigate('/');
  };

  const handleStartGame = () => {
    setIsPieceSettingsOpen(false);
    const newBoard = new chessboard();
    newBoard.initialize();
    setBoard(newBoard);
    setWinner(null);
  };

  const checkForWinner = () => {
    const whiteKing = board.whiteKing;
    const blackKing = board.blackKing;

    if (whiteKing.captured) {
      setWinner('Black');
    } else if (blackKing.captured) {
      setWinner('White');
    }
  };

  // Define movements for each piece using nested array
  var pawn_movement = extendMovementArray([
    [[], [], [], [], [], [], []],
    [[], [], [], ["first_move"], [], [], []],
    [[], [], ["capture"], ["move"], ["capture"], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
]);

var rook_movement = extendMovementArray([
    [[], [], [], ["move", "capture"], [], [], []],
    [[], [], [], ["move", "capture"], [], [], []],
    [[], [], [], ["move", "capture"], [], [], []],
    [["move", "capture"], ["move", "capture"], ["move", "capture"], [], ["move", "capture"], ["move", "capture"], ["move", "capture"]],
    [[], [], [], ["move", "capture"], [], [], []],
    [[], [], [], ["move", "capture"], [], [], []],
    [[], [], [], ["move", "capture"], [], [], []],
]);

var knight_movement = extendMovementArray([
    [[], [], [], [], [], [], []],
    [[], [], ["move", "capture"], [], ["move", "capture"], [], []],
    [[], ["move", "capture"], [], [], [], ["move", "capture"], []],
    [[], [], [], [], [], [], []],
    [[], ["move", "capture"], [], [], [], ["move", "capture"], []],
    [[], [], ["move", "capture"], [], ["move", "capture"], [], []],
    [[], [], [], [], [], [], []]
]);

var bishop_movement = extendMovementArray([
    [["move", "capture"], [], [], [], [], [], ["move", "capture"]],
    [[], ["move", "capture"], [], [], [], ["move", "capture"], []],
    [[], [], ["move", "capture"], [], ["move", "capture"], [], []],
    [[], [], [], [], [], [], []],
    [[], [], ["move", "capture"], [], ["move", "capture"], [], []],
    [[], ["move", "capture"], [], [], [], ["move", "capture"], []],
    [["move", "capture"], [], [], [], [], [], ["move", "capture"]],
]);

var queen_movement = extendMovementArray([
    [["move", "capture"], [], [], ["move", "capture"], [], [], ["move", "capture"]],
    [[], ["move", "capture"], [], ["move", "capture"], [], ["move", "capture"], []],
    [[], [], ["move", "capture"], ["move", "capture"], ["move", "capture"], [], []],
    [["move", "capture"], ["move", "capture"], ["move", "capture"], [], ["move", "capture"], ["move", "capture"], ["move", "capture"]],
    [[], [], ["move", "capture"], ["move", "capture"], ["move", "capture"], [], []],
    [[], ["move", "capture"], [], ["move", "capture"], [], ["move", "capture"], []],
    [["move", "capture"], [], [], ["move", "capture"], [], [], ["move", "capture"]],
]);

var king_movement = extendMovementArray([
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], ["move", "capture"], ["move", "capture"], ["move", "capture"], [], []],
    [[], [], ["move", "capture"], [                ], ["move", "capture"], [], []],
    [[], [], ["move", "capture"], ["move", "capture"], ["move", "capture"], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
]);

// class structure
class chessboard {
  constructor() {
    this.board = Array(8).fill(null).map(() => Array(8).fill(null));

    this.current_turn = "white";

    this.whiteKing = null;
    this.blackKing = null;
  }

  initialize() {
    this.set_piece(new chesspiece("rook", "white", [0, 0], rook_movement, this), convertSquareToPosition("a1"));
    this.set_piece(new chesspiece("knight", "white", [0, 1], knight_movement, this), convertSquareToPosition("b1"));
    this.set_piece(new chesspiece("bishop", "white", [0, 2], bishop_movement, this), convertSquareToPosition("c1"));
    this.set_piece(new chesspiece("queen", "white", [0, 3], queen_movement, this), convertSquareToPosition("d1"));
    this.set_piece(new chesspiece("king", "white", [0, 4], king_movement, this), convertSquareToPosition("e1"));
    this.set_piece(new chesspiece("bishop", "white", [0, 5], bishop_movement, this), convertSquareToPosition("f1"));
    this.set_piece(new chesspiece("knight", "white", [0, 6], knight_movement, this), convertSquareToPosition("g1"));
    this.set_piece(new chesspiece("rook", "white", [0, 7], rook_movement, this), convertSquareToPosition("h1"));

    for (var i = 0; i < 8; i++) {
      this.set_piece(new chesspiece("pawn", "white", [1, i], pawn_movement, this), convertSquareToPosition(String.fromCharCode(97 + i) + "2"));
    }

    this.set_piece(new chesspiece("rook", "black", [7, 0], rook_movement, this), convertSquareToPosition("a8"));
    this.set_piece(new chesspiece("knight", "black", [7, 1], knight_movement, this), convertSquareToPosition("b8"));
    this.set_piece(new chesspiece("bishop", "black", [7, 2], bishop_movement, this), convertSquareToPosition("c8"));
    this.set_piece(new chesspiece("queen", "black", [7, 3], queen_movement, this), convertSquareToPosition("d8"));
    this.set_piece(new chesspiece("king", "black", [7, 4], king_movement, this), convertSquareToPosition("e8"));
    this.set_piece(new chesspiece("bishop", "black", [7, 5], bishop_movement, this), convertSquareToPosition("f8"));
    this.set_piece(new chesspiece("knight", "black", [7, 6], knight_movement, this), convertSquareToPosition("g8"));
    this.set_piece(new chesspiece("rook", "black", [7, 7], rook_movement, this), convertSquareToPosition("h8"));

    for (var i = 0; i < 8; i++) {
      this.set_piece(new chesspiece("pawn", "black", [6, i], pawn_movement, this), convertSquareToPosition(String.fromCharCode(97 + i) + "7"));
    }

    this.whiteKing = this.get_piece([0, 4]);
    this.blackKing = this.get_piece([7, 4]);
  }

  set_piece(piece, position){
    this.board[position[0]][position[1]] = piece;
  }

  get_piece(position){
    return this.board[position[0]][position[1]] || null;
  }

  get_board(){
    // convert board to dict of position: piece; i.e. {"a1": "bR", "b1": "bN", ...}
    var board_dict = {};
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var piece = this.board[i][j];
        if (piece != null) {
          // check for king vs knight for naming
          var name = piece.name;
          if (name == "knight") {
            name = "n";
          }
          board_dict[convertPositionToSquare([i, j])] = piece.color[0] + name[0].toUpperCase();
        }
      }
    }

    console.log(board_dict);
    return board_dict;

  }
}

class chesspiece {
  constructor(name, color, position, movement, board) {
    this.name = name;
    this.color = color;
    this.position = position;
    this.movement = movement;
    this.board = board;

    this.captured = false;
    this.first_move = true;

    // add other properties here
  }

  move(position) {
    this.board.set_piece(null, this.position);
    this.position = position;
    this.board.set_piece(this, this.position);

    // check for promotion
  }

  check_path_clear(target_pos) {
    var dx = target_pos[1] > this.position[1] ? 1 : target_pos[1] < this.position[1] ? -1 : 0;
    var dy = target_pos[0] > this.position[0] ? 1 : target_pos[0] < this.position[0] ? -1 : 0;

    var relx = target_pos[1] - this.position[1];
    var rely = target_pos[0] - this.position[0];
  
    var x = this.position[1] + dx;
    var y = this.position[0] + dy;

    // only return true if the path is not completely diagonal, vertical, or horizontal
    if (relx != rely && relx != -rely && relx != 0 && rely != 0) {
      return true;
    }

    while (x != target_pos[1] || y != target_pos[0]) {
      if (this.board.get_piece([y, x]) != null) {
        return false;
      }

      x += dx;
      y += dy;
    }

    return true;
  }

  tileable(position) {
    // check if the target pos is within the board
    if (position[0] < 0 || position[0] > 7 || position[1] < 0 || position[1] > 7) {
      return false;
    }

    var rel_pos = [(position[0][0] - this.position[0]) * (this.color == "black" ? 1 : -1), position[0][1] - this.position[1]];

    var target_piece = this.board.get_piece(position[0]);

    // check if the target pos is within the movement pattern
    if (rel_pos[0] + 7 < 0 || rel_pos[0] + 7 > 15 || rel_pos[1] + 7 < 0 || rel_pos[1] + 7 > 15) {
      return false;
    }

    for (var moveType of this.movement[rel_pos[0] + 7][rel_pos[1] + 7]) {
      console.log(this.movement[rel_pos[0] + 7][rel_pos[1] + 7]);
      switch (moveType) {
        case "capture":
          console.log("attempting capture")
          if (target_piece != null && target_piece.color != this.color && this.check_path_clear(position[0])) {
            console.log(`${this.color} ${this.name} captures ${target_piece.color} ${target_piece.name} at ${position}`);
            this.move(position[0]);
            target_piece.captured = true;

            this.first_move = false;
            return true;
          }
          continue;
        case "attack":
          console.log("attempting attack")
          if (target_piece != null && this.check_path_clear(position[0])) {
            console.log(`${this.color} ${this.name} attacks ${target_piece.color} ${target_piece.name} at ${position}`);
            this.board.set_piece(null, position[0]);
            target_piece.captured = true;

            this.first_move = false;
            
            return true;
          }
          continue;
        case "move":
          console.log("attempting move")
          if (target_piece == null && this.check_path_clear(position[0])) {
            console.log(`${this.color} ${this.name} moves to ${position[0]}`);
            this.move(position[0]);

            this.first_move = false;

            return true;
          }
          continue;
        case "first_move":
          console.log("attempting first move")
          if (this.first_move && target_piece == null && this.check_path_clear(position[0])) {
            console.log(`${this.color} ${this.name} moves to ${position[0]}`);
            this.move(position[0]);

            this.first_move = false;

            return true;
          }
        default:
          console.log("Invalid move type");
      }
      return false;
    }
  }
}

// Callbacks
function onPieceDragBegin(piece, square) {
  const boardPiece = board.get_piece(convertSquareToPosition(square));
  if (boardPiece) {
    const validMoves = calculateValidMoves(boardPiece);
    highlightSquares(validMoves);
  }
}
  
  function onPieceClick(piece, square) {
    const boardPiece = board.get_piece(convertSquareToPosition(square));
    if (boardPiece) {
      const validMoves = calculateValidMoves(boardPiece);
      highlightSquares(validMoves);
    }
  }

  function onPieceDrop(fromSquare, toSquare, piece) {
    console.log("onPieceDrop", piece, fromSquare, toSquare);
    // clear highlights
    setMoveSquares({});

    var boardPiece = board.get_piece(convertSquareToPosition(fromSquare));

    if (boardPiece && boardPiece.color === board.current_turn) {
      if(boardPiece.tileable([convertSquareToPosition(toSquare)])){
        board.current_turn = board.current_turn === "white" ? "black" : "white";
        checkForWinner();
      }
    }
  }

  // Helper functions
  function convertSquareToPosition(square) {
    var char_dict = {
      "a": 0,
      "b": 1,
      "c": 2,
      "d": 3,
      "e": 4,
      "f": 5,
      "g": 6,
      "h": 7
    }

    return [parseInt(square[1]) - 1, char_dict[square[0]]];
  }

  function convertPositionToSquare(position) {
    const num_dict = {
      0: "a",
      1: "b",
      2: "c",
      3: "d",
      4: "e",
      5: "f",
      6: "g",
      7: "h"
    }
    return `${num_dict[position[1]]}${position[0] + 1}`;
  }

  function extendMovementArray(movementArray) {
    // Method for dynamically converting 7x7 movement array to 15x15, keeping the center 7x7 the same
    var newMovementArray = Array(15).fill(null).map(() => Array(15).fill([])); // Initialize with empty arrays instead of null
  
    // if the outer edges of the 7x7 movement array aren't empty, (cardinal and diagonal only) then extend the 16x16 movement array and fill in the outer edges to simulate an infinite board
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++) {
        if (i >= 4 && i <= 10 && j >= 4 && j <= 10) {
          newMovementArray[i][j] = movementArray[i - 4][j - 4];
        }
      }
    }

    return newMovementArray;
  }

  function calculateValidMoves(piece) {
    // NOTE -> reversed y dir for white: fix later

    const validMoves = [];
    if (!piece) return validMoves;
  
    // Iterate through the movement pattern of the piece
    piece.movement.forEach((row, rowIndex) => {
      row.forEach((moveTypes, colIndex) => {
        moveTypes.forEach((moveType) => {

           // Flip the y-direction for white pieces
          const targetRow = piece.color === 'white'
          ? piece.position[0] - rowIndex + 7  // Adjusting for offset
          : piece.position[0] + rowIndex - 7; // Adjusting for offset
          const targetCol = piece.position[1] + colIndex - 7; // Adjusting for offset
          const targetPos = [targetRow, targetCol];

          if(targetRow < 0 || targetRow > 15 || targetCol < 0 || targetCol > 15) return;
  
          if (moveType === "move" && piece.check_path_clear(targetPos)) {
            validMoves.push(convertPositionToSquare(targetPos));
          } else if (moveType === "first_move" && piece.check_path_clear(targetPos)) {
            validMoves.push(convertPositionToSquare(targetPos));
          }
        });
      });
    });
  
    return validMoves;
  }

  function highlightSquares(squares) {
    const highlightStyle = { backgroundColor: 'rgba(0, 0, 100, 0.5)' };
    const newMoveSquares = squares.reduce((acc, square) => {
      acc[square] = highlightStyle;
      return acc;
    }, {});
    setMoveSquares(newMoveSquares);
  }

  const pieces = [
    "wP",
    "wN",
    "wB",
    "wR",
    "wQ",
    "wK",
    "bP",
    "bN",
    "bB",
    "bR",
    "bQ",
    "bK",
  ];

  const customPieces = useMemo(() => {
    const pieceComponents = {};
    pieces.forEach((piece) => {
      const imageSrc = require(`./pieces/${piece}.png`);
      pieceComponents[piece] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth * 0.98,
            height: squareWidth * 0.98,
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "98%",
            backgroundRepeat: 'no-repeat'
          }}
        />
      );
    });
    return pieceComponents;
  }, []);

  return (
    <div className="chessboard">
      {winner && <WinLoseScreen winner={winner} onRestart={handleStartGame} />}
      <div
        style={{
          width: "480px",
          height: "480px",

        }}
      >
        {isLoading ? (
          <div>Loading...</div> // Show a loading message or spinner while the board is loading
        ) : (
          <Chessboard
            id="Configurable Board"
            position={board.get_board()}
            onArrowsChange={function noRefCheck(){}}
            onDragOverSquare={function noRefCheck(){}}
            onMouseOutSquare={function noRefCheck(){}}
            onMouseOverSquare={function noRefCheck(){}}
            onPieceClick={onPieceClick} /* onPieceClick */
            onPieceDragBegin={onPieceDragBegin} /* onPieceDragBegin */
            onPieceDragEnd={function noRefCheck(){}}
            onPieceDrop={onPieceDrop} /* onPieceDrop */
            onPromotionCheck={function noRefCheck(){}}
            onPromotionPieceSelect={function noRefCheck(){}}
            onSquareClick={function noRefCheck(){}}
            onSquareRightClick={function noRefCheck(){}}
            snapToCursor={false}
            customSquareStyles={moveSquares}
            customBoardStyle={{
                /* From https://css.glass */
                opacity: 0.9,
            }}
            customDarkSquareStyle={{ backgroundImage: "url('https://pacacc.org/wp-content/uploads/2021/05/2114880_gray-semi-transparent-grey-box-hd-png-download.png')",}}
            customLightSquareStyle={{ backgroundImage: "url('https://red8interactive-website-images.s3.us-west-2.amazonaws.com/wp-content/uploads/2020/04/24191653/White-Translucent-Background-50.png')", }}
            customNotationStyle={{
              opacity: 0,
            }}
            customPieces={customPieces}
          />
        )}
      </div>
      <button className="pause-button" onClick={handlePauseClick}>❚❚</button>
      <PauseModal
        isOpen={isPaused}
        onClose={handleResumeClick}
        onReset={handleResetClick}
        onAbout={handleAboutClick}
        onExit={handleExitClick}
      />
      <PieceSettingsModal
        isOpen={isPieceSettingsOpen}
        onClose={() => setIsPieceSettingsOpen(false)}
        onStart={handleStartGame}
      />
      <About
        isOpen={isAbout}
        onClose={() => setIsAbout(false)}
      />
    </div>
  );
}

export default Menu;