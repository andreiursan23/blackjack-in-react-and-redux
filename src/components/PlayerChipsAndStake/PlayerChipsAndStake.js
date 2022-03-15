// React imports
import React from "react";
// Redux imports
import { useSelector } from "react-redux";
// Styles imports
import styles from "./PlayerChipsAndStake.module.css";

// ---- Actual component ----
function PlayerChipsAndStake() {
  const playerChips = useSelector((state) => state.gameLogic.player.chips);
  const currentStake = useSelector(
    (state) => state.gameLogic.game.currentStake
  );

  return (
    <div className={styles.container}>
      <div className={styles.total}>
        <p className={styles.cards}>Your Total Money:</p>
        <p className={styles.values}>${playerChips}</p>
      </div>
      <div className={styles.stake}>
        <p className={`${styles.cards} ${styles.padding}`}>Money at stake:</p>
        <p className={styles.values}>
          {currentStake ? `$${currentStake}` : null}
        </p>
      </div>
    </div>
  );
}

export default PlayerChipsAndStake;
