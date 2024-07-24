export default function GameBoard({currActivePlayer, board}) {
    
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => ( //array di array, prima le righe
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol,colIndex) => (//poi le colonne
                  <li key={colIndex}>
                    <button onClick={() => currActivePlayer(rowIndex, colIndex)} disabled={playerSymbol !== null? true : false}>
                      {playerSymbol}
                    </button>
                  </li>
                ))}
            </ol>
          </li>
        ))}
    </ol>
  );
}
