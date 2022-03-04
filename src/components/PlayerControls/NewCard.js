import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { gameLogicActions } from "../../store/game-logic/game-logic-slice";

import { newCardPhase } from "../../utils/new-card/newCardPhase";
import {
  generateRandomCard,
  calcCardsSum,
  dealerGameWhenPlayerHasBlackjack,
  endGameTiedRound,
  endGamePlayerWon,
  gameNotDecided,
  changeAceValue,
  endGamePlayerLost,
} from "../../utils/helperFunctions";

import PlayerControlsBtn from "../../ui/PlayerControlsBtn/PlayerControlsBtn";

function NewCard() {
  const dispatch = useDispatch();
  const isNewCardBtnDisabled = useSelector(
    (state) => state.gameLogic.game.isNewCardBtnDisabled
  );
  const currentStake = useSelector(
    (state) => state.gameLogic.game.currentStake
  );
  const playerChips = useSelector((state) => state.gameLogic.player.chips);
  let playerCards = useSelector((state) => state.gameLogic.player.cards);
  let dealerCards = useSelector((state) => state.gameLogic.dealer.cards);
  let playerSum = useSelector((state) => state.gameLogic.player.sum);
  let dealerSum = useSelector((state) => state.gameLogic.dealer.sum);
  let wasPlayerAceChangeDone = useSelector(
    (state) => state.gameLogic.player.wasAceChangeDone
  );
  let wasDealerAceChangeDone = useSelector(
    (state) => state.gameLogic.dealer.wasAceChangeDone
  );

  const handleNewCard = () => {
    newCardPhase(
      dispatch,
      gameLogicActions,
      generateRandomCard,
      calcCardsSum,
      dealerGameWhenPlayerHasBlackjack,
      endGameTiedRound,
      endGamePlayerWon,
      gameNotDecided,
      changeAceValue,
      endGamePlayerLost,
      playerCards,
      playerSum,
      dealerCards,
      dealerSum,
      wasDealerAceChangeDone,
      wasPlayerAceChangeDone,
      currentStake,
      playerChips
    );
  };

  return (
    <div onClick={handleNewCard}>
      <PlayerControlsBtn title={"New card"} isDisabled={isNewCardBtnDisabled} />
    </div>
  );
}

export default NewCard;
