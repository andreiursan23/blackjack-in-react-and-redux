// React imports
import React from "react";
// Redux imports
import { useSelector } from "react-redux";
// Styles imports
import styles from "./PlayerDisplay.module.css";
// Helper functions imports
import {
  displayPlayerCards,
  displayPlayerSum,
} from "../../utils/helperFunctions";

// ---- Actual component ----
function PlayerDisplay() {
  const gamePhase = useSelector((state) => state.gameLogic.game.phase);
  const playerCards = useSelector((state) => state.gameLogic.player.cards);
  const playerCardsSum = useSelector((state) => state.gameLogic.player.sum);

  return (
    <div className={styles.container}>
      <div className={styles.cards_container}>
        <p className={styles.cards}>Player's Cards:</p>
        <p className={styles.cards_values}>
          {displayPlayerCards(playerCards, gamePhase)}
        </p>
      </div>
      <div className={styles.sum_container}>
        <p className={styles.cards}>Sum:</p>
        <p className={styles.cards_values}>
          {displayPlayerSum(playerCardsSum, gamePhase)}
        </p>
      </div>
    </div>
  );
}

export default PlayerDisplay;
