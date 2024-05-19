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

  const [moveSquares, setMoveSquares] = useState({});

  function onPieceDragBegin(piece, square) {
    console.log("onPieceDragBegin", piece, square);
    highlightSquares([square]);
  }

  function onPieceDrop(piece, fromSquare, toSquare, dropResult) {
    console.log("onPieceDrop", piece, fromSquare, toSquare, dropResult);
    // clear highlights
    setMoveSquares({});
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