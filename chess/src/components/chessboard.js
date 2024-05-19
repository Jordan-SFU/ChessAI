import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chessboard.css';
import PieceSettingsModal from './PieceSettingsModal';
import PauseModal from './PauseModal';
import About from './About';
import { Chessboard } from "react-chessboard";

function Menu() {
  const [isPaused, setIsPaused] = useState(false);
  const [isAbout, setIsAbout] = useState(false);
  const [isPieceSettingsOpen, setIsPieceSettingsOpen] = useState(false);
  const navigate = useNavigate();

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
    // Implement the game start logic here
  };

  // Define movements for each piece using nested array
  var pawn_movement = [
      [[], [], [], [], [], [], []],
      [[], [], [], ["first_move"], [], [], []],
      [[], [], ["capture"], ["move"], ["capture"], [], []],
      [[], [], [], [], [], [], []],
      [[], [], [], [], [], [], []],
      [[], [], [], [], [], [], []],
      [[], [], [], [], [], [], []],
  ]

  var rook_movement = [
      [[], [], [], ["move", "capture"], [], [], []],
      [[], [], [], ["move", "capture"], [], [], []],
      [[], [], [], ["move", "capture"], [], [], []],
      [["move"], ["move"], ["move"], [], ["move"], ["move"], ["move"]],
      [[], [], [], ["move", "capture"], [], [], []],
      [[], [], [], ["move", "capture"], [], [], []],
      [[], [], [], ["move", "capture"], [], [], []],
  ]

  var knight_movement = [
      [[], [], [], [], [], [], []],
      [[], [], ["move", "capture"], [], ["move", "capture"], [], []],
      [[], ["move", "capture"], [], [], [], ["move", "capture"], []],
      [[], [], [], [], [], [], []],
      [[], ["move", "capture"], [], [], [], ["move", "capture"], []],
      [[], [], ["move", "capture"], [], ["move", "capture"], [], []],
      [[], [], [], [], [], [], []]
  ]

  var bishop_movement = [
      [["move", "capture"], [], [], [], [], [], ["move", "capture"]],
      [[], ["move", "capture"], [], [], [], ["move", "capture"], []],
      [[], [], ["move", "capture"], [], ["move", "capture"], [], []],
      [[], [], [], [], [], [], []],
      [[], [], ["move", "capture"], [], ["move", "capture"], [], []],
      [[], ["move", "capture"], [], [], [], ["move", "capture"], []],
      [["move", "capture"], [], [], [], [], [], ["move", "capture"]],
  ]

  var queen_movement = [
      [["move", "capture"], [], [], ["move", "capture"], [], [], ["move", "capture"]],
      [[], ["move", "capture"], [], ["move", "capture"], [], ["move", "capture"], []],
      [[], [], ["move", "capture"], ["move", "capture"], ["move", "capture"], [], []],
      [["move", "capture"], ["move", "capture"], ["move", "capture"], [], ["move", "capture"], ["move", "capture"], ["move", "capture"]],
      [[], [], ["move", "capture"], ["move", "capture"], ["move", "capture"], [], []],
      [[], ["move", "capture"], [], ["move", "capture"], [], ["move", "capture"], []],
      [["move", "capture"], [], [], ["move", "capture"], [], [], ["move", "capture"]],
  ]

  var king_movement = [
      [[], [], [], [], [], [], []],
      [[], [], [], [], [], [], []],
      [[], [], ["move", "capture"], ["move", "capture"], ["move", "capture"], [], []],
      [[], [], ["move", "capture"], [                ], ["move", "capture"], [], []],
      [[], [], ["move", "capture"], ["move", "capture"], ["move", "capture"], [], []],
      [[], [], [], [], [], [], []],
      [[], [], [], [], [], [], []],
  ]
  
  // class structure
  class chessboard {
    constructor() {
      this.board = Array(8).fill(null).map(() => Array(8).fill(null));
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
    }

    set_piece(piece, position){
      this.board[position[0]][position[1]] = piece;
    }

    get_piece(position){
      return this.board[position[0]][position[1]] || null;
    }
  }

  var board = new chessboard();

  class chesspiece {
    constructor(name, color, position, movement, board) {
      this.name = name;
      this.color = color;
      this.position = position;
      this.movement = movement;
      this.board = board;

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
    
      var x = this.position[1] + dx;
      var y = this.position[0] + dy;
  
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

      for (var moveType of this.movement[rel_pos[0] + 3][rel_pos[1] + 3]) {
        console.log(this.movement[rel_pos[0] + 3][rel_pos[1] + 3]);
        switch (moveType) {
          case "capture":
            console.log("attempting capture")
            if (target_piece != null && target_piece.color != this.color && this.check_path_clear(position[0])) {
              console.log("{this.color} {this.name} captures {target_piece.color} {target_piece.name} at {position}");
              this.move(position);
              return true;
            }
            continue;
          case "attack":
            console.log("attempting attack")
            if (target_piece != null && this.check_path_clear(position[0])) {
              console.log("{this.color} {this.name} attacks {target_piece.color} {target_piece.name} at {position}");
              this.board.set_piece(null, position[0]);
              return true;
            }
            continue;
          case "move":
            console.log("attempting move")
            if (target_piece == null && this.check_path_clear(position[0])) {
              console.log(`${this.color} ${this.name} moves to ${position[0]}`);
              this.move(position[0]);
              return true;
            }
            continue;
          default:
            console.log("Invalid move type");
        }
        return false;
      }
    }
  }

  board.initialize();

  // useStates
  const [moveSquares, setMoveSquares] = useState({});

  // Callbacks
  function onPieceDragBegin(piece, square) {
    //console.log("onPieceDragBegin", piece, square);
    highlightSquares([square]);
  }

  function onPieceDrop(fromSquare, toSquare, piece) {
    console.log("onPieceDrop", piece, fromSquare, toSquare);
    // clear highlights
    setMoveSquares({});

    var boardPiece = board.get_piece(convertSquareToPosition(fromSquare));

    boardPiece.tileable([convertSquareToPosition(toSquare)]);
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

  function highlightSquares(squares) {
    const highlightStyle = { backgroundColor: 'rgba(255, 255, 0, 0.5)' };
    const newMoveSquares = squares.reduce((acc, square) => {
      acc[square] = highlightStyle;
      return acc;
    }, {});
    setMoveSquares(newMoveSquares);
  }

  return (
    <div className="chessboard">
      <div
        style={{
          width: "50vh",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Chessboard
          id="Configurable Board"
          onArrowsChange={function noRefCheck(){}}
          onDragOverSquare={function noRefCheck(){}}
          onMouseOutSquare={function noRefCheck(){}}
          onMouseOverSquare={function noRefCheck(){}}
          onPieceClick={function noRefCheck(){}}
          onPieceDragBegin={onPieceDragBegin}
          onPieceDragEnd={function noRefCheck(){}}
          onPieceDrop={onPieceDrop}
          onPromotionCheck={function noRefCheck(){}}
          onPromotionPieceSelect={function noRefCheck(){}}
          onSquareClick={function noRefCheck(){}}
          onSquareRightClick={function noRefCheck(){}}
          customSquareStyles={moveSquares}
        />
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