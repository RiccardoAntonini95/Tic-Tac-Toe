export default function GameOver({ winner }) { //se è pari sappiamo che winner è null
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{winner? `${winner} won!` : "It's a draw!"}</p>
      <p>
        <button>Restart</button>
      </p>
    </div>
  );
}
