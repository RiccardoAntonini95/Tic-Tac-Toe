import { useState } from "react";

export default function Player({ name, symbol, isActivePlayer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name)

  function handleEdit() {
    setIsEditing(isEditing => !isEditing);
  };

  function handleChange(e) {
    setPlayerName(e.target.value)
  }

  return (
    <li className={isActivePlayer? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input type="text" value={playerName} onChange={handleChange} />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing? "Save" : "Edit"}</button>
    </li>
  );
}
