// React imports
import React from "react";
// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { gameLogicActions } from "../../store/game-logic/game-logic-slice";
// Helper functions imports
import { standRoundPhase } from "../../utils/stand-round/standRoundPhase";
import {
  generateRandomCard,
  calcCardsSum,
  changeAceValue,
} from "../../utils/helperFunctions";
// Components imports
import PlayerControlsBtn from "../../ui/PlayerControlsBtn/PlayerControlsBtn";

// ---- Actual component ----
function StandRound() {
  const dispatch = useDispatch();
  const isStandRoundBtnDisabled = useSelector(
    (state) => state.gameLogic.game.isStandRoundBtnDisabled
  );
  const currentGameStates = useSelector((state) => state.gameLogic);

  const handleStandRound = () => {
    const result = standRoundPhase(
      currentGameStates,
      generateRandomCard,
      calcCardsSum,
      changeAceValue
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
      return dispatch(gameLogicActions.endGamePlayerWon());
    }
    if (result.playerLost) {
      return dispatch(gameLogicActions.endGamePlayerLost());
    }
  };

  return (
    <div onClick={handleStandRound}>
      <PlayerControlsBtn title={"Stand"} isDisabled={isStandRoundBtnDisabled} />
    </div>
  );
}

export default StandRound;
