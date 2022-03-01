import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { gameLogicActions } from "../../store/game-logic/game-logic-slice";

import PlayerControlsBtn from "../../ui/PlayerControlsBtn/PlayerControlsBtn";

function NewCard() {
  const dispatch = useDispatch();
  const isNewCardBtnDisabled = useSelector(
    (state) => state.gameLogic.game.isNewCardBtnDisabled
  );

  const newCard = () => {
    console.log("merge");
  };

  return (
    <div onClick={newCard}>
      <PlayerControlsBtn title={"New card"} isDisabled={isNewCardBtnDisabled} />
    </div>
  );
}

export default NewCard;
