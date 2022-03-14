import React from "react";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { gameLogicActions } from "../../store/game-logic/game-logic-slice";

import styles from "./BetDisplay.module.css";

import BetSumBtn from "../../ui/BetSumBtn/BetSumBtn";

function BetDisplay() {
  const dispatch = useDispatch();

  const [selectedBtn, setSelectedBtn] = useState(null);

  const selectBetStake = (value) => {
    // TO DO: Below has to change to a single reducer
    // Reset game if a previous game was played
    // dispatch(gameLogicActions.updatePlayerCards(null));
    // dispatch(gameLogicActions.updateDealerCards(null));
    // dispatch(gameLogicActions.updatePlayerSum(null));
    // dispatch(gameLogicActions.updateDealerSum(null));

    // // Start new bet stake selection
    // dispatch(gameLogicActions.changeCurrentStake(value));
    // dispatch(gameLogicActions.changeGamesPhase("ongoing"));
    // dispatch(gameLogicActions.updatePlayerChips(playerChips - value));
    // dispatch(gameLogicActions.updateBtnAvailability([false, true, true]));

    dispatch(gameLogicActions.selectBetValueSteps(value));
    setSelectedBtn(value);
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
