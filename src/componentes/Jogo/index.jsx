import { useState } from 'react';
import './style.css'; 
import Tabuleiro from '../Tabuleiro';

export default function Jogo() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0; //Quando for par, vai ser a vez do X!
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  //O squares serve como um place holder para o primeiro item do array que se refere ao elemento em si. O segundo parametro é o que realmente é necessario que é o ID. Essa é uma tecnica classica do map.
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Vá até a jogada #' + move;
    } else {
      description = 'Vá até o início do jogo';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Tabuleiro xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}