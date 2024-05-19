import React from 'react';
import './PieceSettingsModal.css';

const PieceSettingsModal = ({ isOpen, onClose, onStart }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Piece Settings</h2>
                {/* Add your piece settings form here */}
                <div className="piece-settings">
                    <div className="piece">
                        <h3>King</h3>
                        {/* Add settings for King */}
                    </div>
                    <div className="piece">
                        <h3>Queen</h3>
                        {/* Add settings for Queen */}
                    </div>
                    <div className="piece">
                        <h3>Rook</h3>
                        {/* Add settings for Rook */}
                    </div>
                    <div className="piece">
                        <h3>Knight</h3>
                        {/* Add settings for Knight */}
                    </div>
                    <div className="piece">
                        <h3>Bishop</h3>
                        {/* Add settings for Bishop */}
                    </div>
                    <div className="piece">
                        <h3>Pawn</h3>
                        {/* Add settings for Pawn */}
                    </div>
                </div>
                <button onClick={onStart}>Start Game</button>
            </div>
        </div>
    );
};

export default PieceSettingsModal;
