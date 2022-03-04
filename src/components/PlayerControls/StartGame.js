import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { gameLogicActions } from "../../store/game-logic/game-logic-slice";

import { startGamePhase } from "../../utils/start-game/startGamePhase";
import {
  generateRandomCard,
  calcCardsSum,
  evaluateGameBlackjack,
  changeAceValue,
  trackAceValueChangeWhenBothCardsAreAces,
  endGameTiedRound,
  endGamePlayerWon,
  dealerGameWhenPlayerHasBlackjack,
  gameNotDecided,
} from "../../utils/helperFunctions";

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
  let playerSum = useSelector((state) => state.gameLogic.player.sum);
  let dealerSum = useSelector((state) => state.gameLogic.dealer.sum);
  let wasPlayerAceChangeDone = useSelector(
    (state) => state.gameLogic.player.wasAceChangeDone
  );
  let wasDealerAceChangeDone = useSelector(
    (state) => state.gameLogic.dealer.wasAceChangeDone
  );

  const handleStartGame = () => {
    startGamePhase(
      dispatch,
      gameLogicActions,
      generateRandomCard,
      trackAceValueChangeWhenBothCardsAreAces,
      calcCardsSum,
      evaluateGameBlackjack,
      endGameTiedRound,
      endGamePlayerWon,
      gameNotDecided,
      changeAceValue,
      dealerGameWhenPlayerHasBlackjack,
      playerSum,
      dealerSum,
      currentStake,
      playerChips,
      wasPlayerAceChangeDone,
      wasDealerAceChangeDone
    );
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
