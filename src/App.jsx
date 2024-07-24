import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [activePlayer, setActivePlayer] = useState("X")

  function handleActivePlayer(rowIndex, colIndex) {
    setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns((prevTurns) => {
      let currentPlayer = 'X'

      if(prevTurns.length > 0 && prevTurns[0].player === 'X'){   // se esiste un turno precedente (length > 0)
        currentPlayer = 'O'                                      // e se nel turno precedente in updatedTurns c'era X allora adesso c'è O
      }
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
        <GameBoard currActivePlayer={handleActivePlayer} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
