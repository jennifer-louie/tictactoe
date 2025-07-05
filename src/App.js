import './App.css';
import { useState } from 'react';
import cross_icon from './Assets/cross.png';
import circle_icon from './/Assets/circle.png';

function Square({ value, onSquareClick }) {
  let image_src = null;
  if (value === 'X') {
    image_src = cross_icon;
  }
  else if (value === 'O') {
    image_src = circle_icon;
  }
  
  return <button className="boxes" onClick={onSquareClick}><img src={image_src} alt="" /></button>;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(0).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  let status;
  const winner = calculateWinner(squares);
  if (winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const reset = () => {
    setSquares(Array(0).fill(null));
    status = "";
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)){
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
       nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // checks if it's all X or O's
        return squares[a];
      }
    }
    return null;
  }

  return (
    <>
      <div className="container">
        <h1 className="title">Tic Tac Toe</h1>
          <div className="status">{status}</div>
          <div className="board">
            <div className="row1">
              <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
              <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
              <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="row2">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
              <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
              <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="row3">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
              <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
              <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
          </div>

          <button className="reset" onClick={()=>reset()}>Reset</button>
      </div>
    </>
  );
}