import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { gameLogicActions } from "../../store/game-logic/game-logic-slice";

import PlayerControlsBtn from "../../ui/PlayerControlsBtn/PlayerControlsBtn";

function StandRound() {
  const dispatch = useDispatch();
  const isStandRoundBtnDisabled = useSelector(
    (state) => state.gameLogic.game.isStandRoundBtnDisabled
  );

  const standRound = () => {
    console.log("merge");
  };

  return (
    <div onClick={standRound}>
      <PlayerControlsBtn title={"Stand"} isDisabled={isStandRoundBtnDisabled} />
    </div>
  );
}

export default StandRound;
