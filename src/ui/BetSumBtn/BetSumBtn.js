import React from "react";

import { useSelector } from "react-redux";

import styles from "./BetSumBtn.module.css";

function BetSumBtn({ value, selectBetStake, selectedBtn }) {
  const gamePhase = useSelector((state) => state.gameLogic.game.phase);

  return (
    <button
      className={selectedBtn !== value ? styles.button : styles.button_selected}
      disabled={gamePhase === "betting" ? false : true}
      onClick={() => selectBetStake(value)}
    >
      Bet ${value}
    </button>
  );
}

export default BetSumBtn;
