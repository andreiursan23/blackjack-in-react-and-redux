import React from "react";

import styles from "./PlayerDisplay.module.css";

import { useSelector } from "react-redux";

import { displayAllCards } from "../../utils/helperFunctions";

function PlayerDisplay() {
  const playerCards = useSelector((state) => state.gameLogic.player.cards);
  const playerCardsSum = useSelector((state) => state.gameLogic.player.sum);

  return (
    <div className={styles.container}>
      <div className={styles.cards_container}>
        <p className={styles.cards}>Player's Cards:</p>
        <p className={styles.cards_values}>{displayAllCards(playerCards)}</p>
      </div>
      <div className={styles.sum_container}>
        <p className={styles.cards}>Sum:</p>
        <p className={styles.cards_values}>{playerCardsSum}</p>
      </div>
    </div>
  );
}

export default PlayerDisplay;
