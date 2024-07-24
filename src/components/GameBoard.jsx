const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({currActivePlayer, turns}) {
  //DERIVED STATE
  let gameBoard = initialGameBoard;

  for(const turn of turns){
    const {square, player} = turn //destrutturo quello che mi arriva da app.jsx
    const {row, col} = square //destrutturo square in row e col visto che era un oggetto

    gameBoard[row][col] = player //assegno al board alle coordinate il simbolo del giocatore (player)
  }
    
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => ( //array di array, prima le righe
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol,colIndex) => (//poi le colonne
                  <li key={colIndex}>
                    <button onClick={() => currActivePlayer(rowIndex, colIndex)}>{playerSymbol}</button>
                  </li>
                ))}
            </ol>
          </li>
        ))}
    </ol>
  );
}
