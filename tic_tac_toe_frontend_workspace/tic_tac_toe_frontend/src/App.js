import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Returns the styled main Tic Tac Toe app with game logic and controls.
 */
function App() {
  // Game state: board (array of 9 cells), current player, status, winner, draw
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(sq => sq !== null);

  // PUBLIC_INTERFACE
  /** Handles click on a cell. */
  function handleSquareClick(idx) {
    if (winner || board[idx]) return;
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  /** Resets the game to the initial state. */
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  // Compute dynamic status message.
  let status = '';
  if (winner) {
    status = (
      <span>
        <span className='ttt-winner' style={{ color: winner === 'X' ? 'var(--accent)' : 'var(--primary)' }}>
          {winner}
        </span>
        &nbsp;wins!
      </span>
    );
  } else if (isDraw) {
    status = <span className='ttt-draw'>It’s a draw!</span>;
  } else {
    status = (
      <span>
        Turn:&nbsp;
        <span className='ttt-player-indicator' style={{ color: xIsNext ? 'var(--accent)' : 'var(--primary)' }}>
          {xIsNext ? 'X' : 'O'}
        </span>
      </span>
    );
  }

  return (
    <div className="app ttt-outer">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> Tic Tac Toe
            </div>
            <button className="btn" onClick={handleRestart}>Restart</button>
          </div>
        </div>
      </nav>
      <main>
        <div className="ttt-main-container">
          <div className="ttt-status-area">{status}</div>
          <Board squares={board} onSquareClick={handleSquareClick} winnerLine={winner && winner.line} />
        </div>
      </main>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Renders the 3x3 Tic Tac Toe board and handles square clicks/highlighting.
 */
function Board({ squares, onSquareClick, winnerLine }) {
  // Render the 3-board rows (0-2, 3-5, 6-8)
  function renderSquare(idx) {
    let highlight = winnerLine && winnerLine.includes(idx);
    return (
      <button
        className={"ttt-square" + (highlight ? " ttt-square-win" : "")}
        onClick={() => onSquareClick(idx)}
        key={idx}
        aria-label={`Square ${idx % 3 + 1}, row ${Math.floor(idx / 3) + 1}`}
      >
        {squares[idx]}
      </button>
    );
  }
  let boardRows = [0, 1, 2].map(rowIdx => (
    <div className="ttt-board-row" key={rowIdx}>
      {[0, 1, 2].map(colIdx => renderSquare(rowIdx * 3 + colIdx))}
    </div>
  ));
  return <div className="ttt-board">{boardRows}</div>;
}

// PUBLIC_INTERFACE
/**
 * Returns winner symbol if found, else null.
 * If there's a win, also returns the winning line array for highlighting.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6], // diags
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const winnerObj = squares[a];
      return Object.assign(winnerObj, { line }); // also include winning line for highlight
    }
  }
  // Instead, return {value, line} for winner; or null
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

export default App;
