import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { gameLogicActions } from "../../store/game-logic/game-logic-slice";

import { standRoundPhase } from "../../utils/stand-round/standRoundPhase";
import {
  dealerGameWhenPlayerStandsRound,
  endGamePlayerWon,
  endGameTiedRound,
  endGamePlayerLost,
  generateRandomCard,
  calcCardsSum,
  changeAceValue,
} from "../../utils/helperFunctions";

import PlayerControlsBtn from "../../ui/PlayerControlsBtn/PlayerControlsBtn";

function StandRound() {
  const dispatch = useDispatch();
  const isStandRoundBtnDisabled = useSelector(
    (state) => state.gameLogic.game.isStandRoundBtnDisabled
  );
  const currentStake = useSelector(
    (state) => state.gameLogic.game.currentStake
  );
  const playerChips = useSelector((state) => state.gameLogic.player.chips);
  let dealerCards = useSelector((state) => state.gameLogic.dealer.cards);
  let playerSum = useSelector((state) => state.gameLogic.player.sum);
  let dealerSum = useSelector((state) => state.gameLogic.dealer.sum);
  let wasDealerAceChangeDone = useSelector(
    (state) => state.gameLogic.dealer.wasAceChangeDone
  );

  const handleStandRound = () => {
    standRoundPhase(
      dealerCards,
      dealerSum,
      wasDealerAceChangeDone,
      playerSum,
      playerChips,
      currentStake,
      dispatch,
      gameLogicActions,
      dealerGameWhenPlayerStandsRound,
      endGamePlayerWon,
      endGameTiedRound,
      endGamePlayerLost,
      generateRandomCard,
      calcCardsSum,
      changeAceValue
    );
  };

  return (
    <div onClick={handleStandRound}>
      <PlayerControlsBtn title={"Stand"} isDisabled={isStandRoundBtnDisabled} />
    </div>
  );
}

export default StandRound;
