export const startGamePhase = (
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
) => {
  // Generate cards and "is card Ace" states
  let card1Player = generateRandomCard();
  let card2Player = generateRandomCard();
  let card1Dealer = generateRandomCard();
  let card2Dealer = generateRandomCard();

  // Check if both cards in hand are Aces
  wasPlayerAceChangeDone = trackAceValueChangeWhenBothCardsAreAces(
    card1Player,
    card2Player
  );
  wasDealerAceChangeDone = trackAceValueChangeWhenBothCardsAreAces(
    card1Dealer,
    card2Dealer
  );

  // Change Ace value from 11 to 1 for player
  if (wasPlayerAceChangeDone) {
    card2Player = 1;
  }
  // Change Ace value from 11 to 1 for dealer
  if (wasDealerAceChangeDone) {
    card2Dealer = 1;
  }

  // Create the two array for cards
  let playerCards = [card1Player, card2Player];
  let dealerCards = [card1Dealer, card2Dealer];

  // Evaluate if player and/or dealer has blackjack
  playerSum = calcCardsSum(playerCards);
  dealerSum = calcCardsSum(dealerCards);
  const hasPlayerBlackjack = evaluateGameBlackjack(playerSum);
  const hasDealerBlackjack = evaluateGameBlackjack(dealerSum);

  // Check if one or both sides have blackjack
  if (hasPlayerBlackjack && hasDealerBlackjack) {
    endGameTiedRound(dispatch, gameLogicActions, playerChips, currentStake);
  } else if (hasPlayerBlackjack) {
    dealerGameWhenPlayerHasBlackjack(
      dealerSum,
      dealerCards,
      dispatch,
      gameLogicActions,
      playerChips,
      currentStake,
      wasDealerAceChangeDone,
      generateRandomCard,
      calcCardsSum,
      endGameTiedRound,
      endGamePlayerWon,
      changeAceValue
    );
  } else {
    // Steps when neither side has blackjack
    gameNotDecided(dispatch, gameLogicActions);
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
