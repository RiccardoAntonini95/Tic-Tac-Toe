export default function GameOver({ winner, onRestart }) { //se è pari sappiamo che winner è null
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{winner? `${winner.toUpperCase()} won!` : "It's a draw!"}</p>
      <p>
        <button onClick={onRestart}>Restart</button>
      </p>
    </div>
  );
}
