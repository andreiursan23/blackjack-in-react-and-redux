// React imports
import React from "react";
import { useState } from "react";
// Redux imports
import { useDispatch } from "react-redux";
import { gameLogicActions } from "../../store/game-logic/game-logic-slice";
// Styles imports
import styles from "./BetDisplay.module.css";
// Components imports
import BetSumBtn from "../../ui/BetSumBtn/BetSumBtn";

// ---- Actual component ----
function BetDisplay() {
  const dispatch = useDispatch();

  const [selectedBtn, setSelectedBtn] = useState(null);

  const selectBetStake = (value) => {
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
