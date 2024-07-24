import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({currActivePlayer, activeSymbol}) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    
    function handleSelect(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            const updatedGameBoard = [...prevGameBoard.map((innerArray) => [...innerArray])] //vanno copiati anche gli array interni
            updatedGameBoard[rowIndex][colIndex] = activeSymbol
            return updatedGameBoard;
        });
        currActivePlayer();
    }
    
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => ( //array di array, prima le righe
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol,colIndex) => (//poi le colonne
                  <li key={colIndex}>
                    <button onClick={() => handleSelect(rowIndex, colIndex)}>{playerSymbol}</button>
                  </li>
                ))}
            </ol>
          </li>
        ))}
    </ol>
  );
}
