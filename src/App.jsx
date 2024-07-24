import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
  const [activePlayer, setActivePlayer] = useState("X")

  function handleActivePlayer() {
    setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X')
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={"Player 1"} symbol={"X"} isActivePlayer={activePlayer === 'X'}/>
          <Player name={"Player 2"} symbol={"O"} isActivePlayer={activePlayer === 'O'}/>
        </ol>
        <GameBoard currActivePlayer={handleActivePlayer} activeSymbol={activePlayer} />
      </div>
    </main>
  );
}

export default App;
