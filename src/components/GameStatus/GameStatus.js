// React imports
import React from "react";
// Redux imports
import { useSelector } from "react-redux";
// Styles imports
import styles from "./GameStatus.module.css";

// ---- Actual component ----
function GameStatus() {
  const gameStatusMsg = useSelector((state) => state.gameLogic.game.statusMsg);

  return (
    <div className={styles.container}>
      <p className={styles.message} id="game-status">
        {gameStatusMsg}
      </p>
    </div>
  );
}

export default GameStatus;
