import React from "react";

import { useSelector } from "react-redux";

import styles from "./BetSumBtn.module.css";

function BetSumBtn({ value, selectBetStake, selectedBtn }) {
  const gamePhase = useSelector((state) => state.gameLogic.game.phase);

  return (
    <button
      className={styles.button}
      disabled={
        gamePhase === "betting" ? false : selectedBtn !== value ? true : false
      }
      onClick={() => selectBetStake(value)}
    >
      Bet ${value}
    </button>
  );
}

export default BetSumBtn;
