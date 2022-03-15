// React imports
import React from "react";
// Redux imports
import { useSelector } from "react-redux";
// Styles imports
import styles from "./BetSumBtn.module.css";

// ---- Actual component ----
function BetSumBtn({ value, selectBetStake, selectedBtn }) {
  const gamePhase = useSelector((state) => state.gameLogic.game.phase);

  return (
    <button
      className={selectedBtn === value ? styles.button_selected : styles.button}
      disabled={
        gamePhase === "ongoing" || gamePhase === "conclusion" ? false : true
      }
      onClick={() => selectBetStake(value)}
    >
      Bet ${value}
    </button>
  );
}

export default BetSumBtn;
