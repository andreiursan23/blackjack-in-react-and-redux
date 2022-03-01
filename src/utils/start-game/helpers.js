export const trackAceValueChangeWhenBothCardsAreAces = (card1, card2) => {
  if (card1 === 11 && card2 === 11) {
    return true;
  } else {
    return false;
  }
};

export const endGamePlayerWon = (
  dispatch,
  gameLogicActions,
  playerChips,
  currentStake
) => {
  dispatch(gameLogicActions.changeGamesStatus("player_won_blackjack"));
  dispatch(gameLogicActions.changeGamesPhase("betting"));
  dispatch(gameLogicActions.updateBtnAvailability([true, true, true]));
  dispatch(gameLogicActions.updatePlayerChips(playerChips + 2 * currentStake));
  dispatch(gameLogicActions.changeCurrentStake(null));
};

export const endGameTiedRound = (
  dispatch,
  gameLogicActions,
  playerChips,
  currentStake
) => {
  dispatch(gameLogicActions.changeGamesStatus("tied_round"));
  dispatch(gameLogicActions.changeGamesPhase("betting"));
  dispatch(gameLogicActions.updateBtnAvailability([true, true, true]));
  dispatch(gameLogicActions.updatePlayerChips(playerChips + currentStake));
  dispatch(gameLogicActions.changeCurrentStake(null));
};
