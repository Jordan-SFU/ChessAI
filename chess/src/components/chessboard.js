import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chessboard.css';
import PieceSettingsModal from './PieceSettingsModal';
import PauseModal from './PauseModal';

function Chessboard() {
  const [isPaused, setIsPaused] = useState(false);
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

  const handleExitClick = () => {
    navigate('/');
  };

  const handleStartGame = () => {
    setIsPieceSettingsOpen(false);
    // Implement the game start logic here
  };

  const rows = 8;
  const cols = 8;
  const board = [];

  // Generate board
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Determine if the square is light or dark
      const isDark = (row + col) % 2 === 1;
      board.push(<Square key={`${row}-${col}`} isDark={isDark} />);
    }
  }

  return (
      <div className="chessboard">
        {board}
        <button className="pause-button" onClick={handlePauseClick}>❚❚</button>
        <PauseModal isOpen={isPaused}
                    onClose={handleResumeClick}
                    onReset={handleResetClick}
                    onExit={handleExitClick}

        />
        <PieceSettingsModal
            isOpen={isPieceSettingsOpen}
            onClose={() => setIsPieceSettingsOpen(false)}
            onStart={handleStartGame}
        />
      </div>
  );
}

function Square({isDark}) {
  const className = isDark ? 'square dark' : 'square light';
  return (

      <div className={className}/>
)
  ;
}

export default Chessboard;
