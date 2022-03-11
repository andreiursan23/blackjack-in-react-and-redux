// React imports
import React from "react";
// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { gameLogicActions } from "../../store/game-logic/game-logic-slice";
// Helper functions imports
import { newCardPhase } from "../../utils/new-card/newCardPhase";
import {
  generateRandomCard,
  calcCardsSum,
  changeAceValue,
  dealerGameWhenPlayerHasBlackjack,
} from "../../utils/helperFunctions";
// Components imports
import PlayerControlsBtn from "../../ui/PlayerControlsBtn/PlayerControlsBtn";

// ---- Actual component ----
function NewCard() {
  const dispatch = useDispatch();
  const isNewCardBtnDisabled = useSelector(
    (state) => state.gameLogic.game.isNewCardBtnDisabled
  );
  const currentGameStates = useSelector((state) => state.gameLogic);

  const handleNewCard = () => {
    const result = newCardPhase(
      currentGameStates,
      generateRandomCard,
      calcCardsSum,
      changeAceValue,
      dealerGameWhenPlayerHasBlackjack
    );

    // Render game with calculated results
    dispatch(
      gameLogicActions.renderGame({
        playerCards: result.playerCards,
        playerSum: result.playerSum,
        dealerCards: result.dealerCards,
        dealerSum: result.dealerSum,
        wasPlayerAceChangeDone: result.wasPlayerAceChangeDone,
        wasDealerAceChangeDone: result.wasDealerAceChangeDone,
      })
    );

    // Update game conclusion
    if (result.gameTied) {
      return dispatch(gameLogicActions.endGameTiedRound());
    }
    if (result.playerWon) {
      return dispatch(gameLogicActions.endGamePlayerWonBlackjack());
    }
    if (result.playerLost) {
      return dispatch(gameLogicActions.endGamePlayerLost());
    }
  };

  return (
    <div onClick={handleNewCard}>
      <PlayerControlsBtn title={"New card"} isDisabled={isNewCardBtnDisabled} />
    </div>
  );
}

export default NewCard;
