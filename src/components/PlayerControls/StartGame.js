import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { gameLogicActions } from "../../store/game-logic/game-logic-slice";

import { startGame } from "../../utils/start-game/startGame";

import PlayerControlsBtn from "../../ui/PlayerControlsBtn/PlayerControlsBtn";

function StartGame() {
  const dispatch = useDispatch();
  const isStartGameBtnDisabled = useSelector(
    (state) => state.gameLogic.game.isStartGameBtnDisabled
  );
  const currentStake = useSelector(
    (state) => state.gameLogic.game.currentStake
  );
  const playerChips = useSelector((state) => state.gameLogic.player.chips);

  const handleStartGame = () => {
    startGame(dispatch, gameLogicActions, playerChips, currentStake);
  };

  return (
    <div onClick={handleStartGame}>
      <PlayerControlsBtn
        title={"Start game"}
        isDisabled={isStartGameBtnDisabled}
      />
    </div>
  );
}

export default StartGame;