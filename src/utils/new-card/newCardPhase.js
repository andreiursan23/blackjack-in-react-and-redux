export const newCardPhase = (
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
  inputPlayerCards,
  playerSum,
  inputDealerCards,
  dealerSum,
  wasDealerAceChangeDone,
  wasPlayerAceChangeDone,
  currentStake,
  playerChips
) => {
  let playerCards = [...inputPlayerCards];
  let dealerCards = [...inputDealerCards];

  console.log(playerCards);
  console.log(dealerCards);

  const newCardPlayer = generateRandomCard();
  playerCards.push(newCardPlayer);
  playerSum = calcCardsSum(playerCards);

  if (playerSum < 21) {
    // Steps when neither side has blackjack
    gameNotDecided(dispatch, gameLogicActions);
  } else if (playerSum === 21) {
    dealerGameWhenPlayerHasBlackjack(
      dealerSum,
      dealerCards,
      dispatch,
      gameLogicActions,
      playerChips,
      currentStake,
      wasDealerAceChangeDone,
      wasPlayerAceChangeDone,
      generateRandomCard,
      calcCardsSum,
      endGameTiedRound,
      endGamePlayerWon,
      changeAceValue
    );
    // Case below: player cards sum is more than 21
  } else {
    if (wasPlayerAceChangeDone) {
      // Player lost steps to be added here
      endGamePlayerLost(dispatch, gameLogicActions, playerChips, currentStake);
    } else {
      // See if player has an ace in hand
      if (playerCards.includes(11)) {
        // Change the value of the ace
        playerCards = changeAceValue(playerCards);
        playerSum = calcCardsSum(playerCards);
        wasPlayerAceChangeDone = true;

        // Steps when neither side has blackjack
        gameNotDecided(dispatch, gameLogicActions);
        // Case below: player does not have ace in hand and player cards sum is more than 21
      } else {
        // Player lost steps to be added here
        endGamePlayerLost(
          dispatch,
          gameLogicActions,
          playerChips,
          currentStake
        );
      }
    }
  }

  // Save all needed values to Redux store
  // Player and dealer cards
  dispatch(gameLogicActions.updatePlayerCards(playerCards));
  dispatch(gameLogicActions.updateDealerCards(dealerCards));
  // Player and dealer cards sum
  dispatch(gameLogicActions.updatePlayerSum(playerCards));
  dispatch(gameLogicActions.updateDealerSum(dealerCards));
  // Player and dealer was ace value changed states
  dispatch(
    gameLogicActions.updatePlayerWasAceChangeDone(wasPlayerAceChangeDone)
  );
  dispatch(
    gameLogicActions.updateDealerWasAceChangeDone(wasDealerAceChangeDone)
  );
};
