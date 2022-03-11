// React imports
import React from "react";
// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { gameLogicActions } from "../../store/game-logic/game-logic-slice";
// Helper functions imports
import { startGamePhase } from "../../utils/start-game/startGamePhase";
import {
  generateRandomCard,
  calcCardsSum,
  evaluateGameBlackjack,
  trackAceValueChangeWhenBothCardsAreAces,
  changeAceValue,
  dealerGameWhenPlayerHasBlackjack,
} from "../../utils/helperFunctions";
// Components imports
import PlayerControlsBtn from "../../ui/PlayerControlsBtn/PlayerControlsBtn";

// ---- Actual component ----
function StartGame() {
  const dispatch = useDispatch();
  const isStartGameBtnDisabled = useSelector(
    (state) => state.gameLogic.game.isStartGameBtnDisabled
  );

  const handleStartGame = () => {
    // Get result after start game phase calculations are done
    const result = startGamePhase(
      generateRandomCard,
      trackAceValueChangeWhenBothCardsAreAces,
      calcCardsSum,
      evaluateGameBlackjack,
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
    if (!result.playerWon) {
      return dispatch(gameLogicActions.gameNotDecided());
    }
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
