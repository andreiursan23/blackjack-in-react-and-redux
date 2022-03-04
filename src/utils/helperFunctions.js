// General helper functions
export const generateRandomCard = () => {
  const cardNumber = Math.floor(Math.random() * 13) + 1;

  if (cardNumber === 1) {
    return 11;
  } else if (cardNumber < 11) {
    return cardNumber;
  } else {
    return 10;
  }
};

export const changeAceValue = (cards) => {
  const index = cards.indexOf(11);

  if (index !== -1) {
    cards[index] = 1;
  }

  return cards;
};

export const calcCardsSum = (cards) => {
  let sum = 0;

  cards.reduce((accumulator, currentValue) => {
    return (sum = accumulator + currentValue);
  });

  return sum;
};

export const evaluateGameState = (cardsSum) => {
  if (cardsSum <= 21) {
    return true;
  } else {
    return false;
  }
};

export const evaluateGameBlackjack = (cardsSum) => {
  if (cardsSum === 21) {
    return true;
  } else {
    return false;
  }
};

export const evaluateGameWon = (playerSum, dealerSum) => {
  if (playerSum === dealerSum) {
    return "draw";
  } else if (playerSum > dealerSum) {
    return true;
  } else {
    return false;
  }
};

export const updatePlayerChips = (roundResult, playerChips, currentStake) => {
  if (roundResult === "draw") {
    return playerChips + currentStake;
  } else if (roundResult === "playerWon") {
    return playerChips + 2 * currentStake;
  } else {
    return playerChips;
  }
};

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

export const endGamePlayerLost = (
  dispatch,
  gameLogicActions,
  playerChips,
  currentStake
) => {
  dispatch(gameLogicActions.changeGamesStatus("player_lost"));
  dispatch(gameLogicActions.changeGamesPhase("betting"));
  dispatch(gameLogicActions.updateBtnAvailability([true, true, true]));
  dispatch(gameLogicActions.updatePlayerChips(playerChips - currentStake));
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

export const gameNotDecided = (dispatch, gameLogicActions) => {
  dispatch(gameLogicActions.changeGamesPhase("ongoing"));
  dispatch(gameLogicActions.changeGamesStatus("draw_or_stand"));
  dispatch(gameLogicActions.updateBtnAvailability([true, false, false]));
};

export const dealerGameWhenPlayerHasBlackjack = (
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
) => {
  // Dealer gets cards until the dealer sum is no longer less than 17
  while (dealerSum < 17) {
    const newCardDealer = generateRandomCard();
    dealerCards.push(newCardDealer);
    dealerSum = calcCardsSum(dealerCards);
  }

  // Reevaluate the dealer sum, after new cards got
  // Check if dealer has blackjack
  if (dealerSum === 21) {
    endGameTiedRound(dispatch, gameLogicActions, playerChips, currentStake);
  } else if (dealerSum > 21) {
    if (wasDealerAceChangeDone) {
      endGamePlayerWon(dispatch, gameLogicActions, playerChips, currentStake);
    } else {
      dealerCards = changeAceValue(dealerCards);
      dealerSum = calcCardsSum(dealerCards);

      // Dealer gets new cards, if needed, after the ace adjustment
      while (dealerSum < 17) {
        const newCardDealer = generateRandomCard();
        dealerCards.push(newCardDealer);
        dealerSum = calcCardsSum(dealerCards);
      }

      if (dealerSum === 21) {
        endGameTiedRound(dispatch, gameLogicActions, playerChips, currentStake);
      } else {
        endGamePlayerWon(dispatch, gameLogicActions, playerChips, currentStake);
      }
    }
  } else {
    // Case when dealer cards sum is between 17 and 21
    endGamePlayerWon(dispatch, gameLogicActions, playerChips, currentStake);
  }
};
