import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combination";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]; 

function deriveActivePlayer (gameTurns) {
  let currentPlayer = 'X'

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){   // se esiste un turno precedente (length > 0)
    currentPlayer = 'O'                                      // e se nel turno precedente in gameTurns c'era X allora adesso c'è O
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = initialGameBoard;
  let winner = null;
  
  for(const turn of gameTurns){
    const {square, player} = turn //destrutturo quello che mi arriva da app.jsx
    const {row, col} = square //destrutturo square in row e col visto che era un oggetto
 
    gameBoard[row][col] = player //assegno al board alle coordinate il simbolo del giocatore (player)
  }

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&       //prima controllo che non sia null così evito altri controlli
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol
      break;
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner //se abbiamo 9 turni e non c'è un vincitore è true altrimenti false

  function handleActivePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex,}, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns; //questo diventa il nuovo state gameTurns
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={"Player 1"} symbol={"X"} isActivePlayer={activePlayer === 'X'}/>
          <Player name={"Player 2"} symbol={"O"} isActivePlayer={activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} />} {/* se abbiamo un vincitore o se c'è un pareggio */}
        <GameBoard currActivePlayer={handleActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
