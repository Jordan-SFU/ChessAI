import React, {useState} from 'react';
import { useNavigate} from "react-router-dom";
import './Start.css'; // Import CSS for styling
import PieceSettingsModal from './PieceSettingsModal';

const Start = () => {

    const [isPieceSettingsOpen, setIsPieceSettingsOpen] = useState(false);
    const navigate = useNavigate();

    const handlePlayButtonClick = () => {
        setIsPieceSettingsOpen(true);
    };



    const handleStartGame = () => {
        setIsPieceSettingsOpen(false);
        navigate('/play');
    };



  return (
    <div className="start">
        <img src='https://i.imgur.com/P0rkW2O.png' alt='chess' className="chesslogo" />
        <div className="smallcard">
          <h1 className="title">Death by Chess</h1>
        </div>
        <div className="button-container">
        <button class="cssbuttons-io-button" onClick = {handlePlayButtonClick}>
          Feel the Pain 
          <div class="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>

            <PieceSettingsModal
                isOpen={isPieceSettingsOpen}
                onClose={() => setIsPieceSettingsOpen(false)}
                onStart={handleStartGame}
            />


      </div>
    </div>
  );
};

export default Start;
