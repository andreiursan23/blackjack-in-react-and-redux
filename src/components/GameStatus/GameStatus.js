import React from "react";

import { useSelector } from "react-redux";

import styles from "./GameStatus.module.css";

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
