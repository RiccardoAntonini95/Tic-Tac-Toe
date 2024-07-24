import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combination";

const PLAYERS = {
  X : 'Player 1',
  O : 'Player 2'
}

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

function deriveWinner (gameBoard, players) {
  let winner = null; 
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&       //prima controllo che non sia null così evito altri controlli
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol] //accedo alla proprietà col simbolo giusto e ricavo il nome del vincitore
      break;
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((arr) => [...arr])]; //IMPORTANTE: l'array è un reference type quindi se non copio sovrascrivo quello vecchio                                           //spread operator sull'array che mappato produce lo spread degli inner array
  
  for(const turn of gameTurns){
    const {square, player} = turn //destrutturo quello che mi arriva da app.jsx
    const {row, col} = square //destrutturo square in row e col visto che era un oggetto
 
    gameBoard[row][col] = player //assegno al board alle coordinate il simbolo del giocatore (player)
  }

  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState(PLAYERS) //inizializzati come oggetto per sfruttare i simboli come chiave e cambiare solo uno dei due valori)
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players)
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

  function handleRestart () {
    setGameTurns([])
  }

  function handlePlayerNameChange (symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,     // copio l'intero oggetto
        [symbol] : newName  // sovrascrivo solo il valore di una dei due giocatori
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol={"X"} isActivePlayer={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player name={PLAYERS.O} symbol={"O"} isActivePlayer={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />} {/* se abbiamo un vincitore o se c'è un pareggio */}
        <GameBoard currActivePlayer={handleActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
