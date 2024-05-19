import React from 'react';
import './PauseModal.css';

const PauseModal = ({ isOpen, onClose, onExit, onReset, onAbout }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Game Paused</h2>
                <button onClick={onClose}>Resume</button>
                <button onClick={onReset}>Reset</button>
                <button onClick={onAbout}>About</button>
                <button onClick={onExit}>Exit</button>
            </div>
        </div>
    );
};

export default PauseModal;
