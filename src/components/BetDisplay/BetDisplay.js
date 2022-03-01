import React from "react";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { gameLogicActions } from "../../store/game-logic/game-logic-slice";

import styles from "./BetDisplay.module.css";

import BetSumBtn from "../../ui/BetSumBtn/BetSumBtn";

function BetDisplay() {
  const dispatch = useDispatch();
  const playerChips = useSelector((state) => state.gameLogic.player.chips);

  const [selectedBtn, setSelectedBtn] = useState(null);

  const selectBetStake = (value) => {
    // Reset game if a previous game was played
    dispatch(gameLogicActions.updatePlayerCards(null));
    dispatch(gameLogicActions.updateDealerCards(null));
    dispatch(gameLogicActions.updatePlayerSum(null));
    dispatch(gameLogicActions.updateDealerSum(null));

    // Start new bet stake selection
    dispatch(gameLogicActions.changeCurrentStake(value));
    dispatch(gameLogicActions.changeGamesPhase("ongoing"));
    setSelectedBtn(value);

    dispatch(gameLogicActions.updatePlayerChips(playerChips - value));
    dispatch(gameLogicActions.updateBtnAvailability([false, true, true]));
  };

  return (
    <div className={styles.container}>
      <BetSumBtn
        value={1}
        selectBetStake={selectBetStake}
        selectedBtn={selectedBtn}
      />
      <BetSumBtn
        value={5}
        selectBetStake={selectBetStake}
        selectedBtn={selectedBtn}
      />
      <BetSumBtn
        value={20}
        selectBetStake={selectBetStake}
        selectedBtn={selectedBtn}
      />
      <BetSumBtn
        value={50}
        selectBetStake={selectBetStake}
        selectedBtn={selectedBtn}
      />
      <BetSumBtn
        value={100}
        selectBetStake={selectBetStake}
        selectedBtn={selectedBtn}
      />
    </div>
  );
}

export default BetDisplay;
