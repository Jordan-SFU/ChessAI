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

  return (
    
      <div className="chessboard">
        <Chessboard id="BasicBoard" />
        <button className="pause-button" onClick={handlePauseClick}>❚❚</button>
        <PauseModal isOpen={isPaused}
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
            isOpen = {isAbout}
            onClose={() =>setIsAbout(false)}
          />
        
      </div>
      
  );
}

export default Menu;
