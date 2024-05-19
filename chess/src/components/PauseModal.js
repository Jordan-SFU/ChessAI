import React from 'react';
import './PauseModal.css';

const PauseModal = ({ isOpen, onClose, onExit, onReset, onAbout }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Game Paused</h2>
                <button onClick={onClose}>Resume</button>
                <h1></h1>
                <button onClick={onReset}>Reset</button>
                <h1></h1>
                <button onClick={onAbout}>About</button>
                <h1></h1>
                <button onClick={onExit}>Exit</button>
                <h1></h1>

            </div>
        </div>
    );
};

export default PauseModal;
