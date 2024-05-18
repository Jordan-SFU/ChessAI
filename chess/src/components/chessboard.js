import React from 'react';
import './Chessboard.css';

function Chessboard() {
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
    </div>
  );
}

function Square({ isDark }) {
  const className = isDark ? 'square dark' : 'square light';
  return (
    <div className={className} />
  );
}

export default Chessboard;
