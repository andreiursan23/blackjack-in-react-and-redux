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

  cards.forEach((card) => {
    sum += card;
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

// TO DO: Add this to Redux actions
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

// TO DO: Add this to Redux actions
export const endGamePlayerLost = (dispatch, gameLogicActions, playerChips) => {
  dispatch(gameLogicActions.changeGamesStatus("player_lost"));
  dispatch(gameLogicActions.changeGamesPhase("betting"));
  dispatch(gameLogicActions.updateBtnAvailability([true, true, true]));
  dispatch(gameLogicActions.updatePlayerChips(playerChips));
  dispatch(gameLogicActions.changeCurrentStake(null));
};

// TO DO: Add this to Redux actions
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

// TO DO: Add this to Redux actions
export const gameNotDecided = (dispatch, gameLogicActions) => {
  dispatch(gameLogicActions.changeGamesStatus("draw_or_stand"));
  dispatch(gameLogicActions.changeGamesPhase("ongoing"));
  dispatch(gameLogicActions.updateBtnAvailability([true, false, false]));
};

// export const getCardsWhenDealerSumIsBelow17 = (dealerSum, dealerCards) => {
//   while (dealerSum < 17) {
//     const newCardDealer = generateRandomCard();
//     dealerCards.push(newCardDealer);
//     dealerSum = calcCardsSum(dealerCards);
//   }

//   return [dealerCards, dealerSum];
// };

export const dealerGameWhenPlayerHasBlackjack = (
  dealerSum,
  dealerCards,
  dispatch,
  gameLogicActions,
  playerChips,
  currentStake,
  wasDealerAceChangeDone,
  funcGenerateRandomCard,
  calcCardsSum,
  endGameTiedRound,
  endGamePlayerWon,
  changeAceValue
) => {
  if (dealerSum > 17) {
    endGamePlayerWon(dispatch, gameLogicActions, playerChips, currentStake);
  } else {
    // Dealer gets cards until the dealer sum is no longer less than 17
    while (dealerSum < 17) {
      const newCardDealer = funcGenerateRandomCard();
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
          const newCardDealer = funcGenerateRandomCard();
          dealerCards.push(newCardDealer);
          dealerSum = calcCardsSum(dealerCards);
        }

        if (dealerSum === 21) {
          endGameTiedRound(
            dispatch,
            gameLogicActions,
            playerChips,
            currentStake
          );
        } else {
          endGamePlayerWon(
            dispatch,
            gameLogicActions,
            playerChips,
            currentStake
          );
        }
      }
    }
  }
};

export const dealerGameWhenPlayerStandsRound = (
  dealerSum,
  dealerCards,
  wasDealerAceChangeDone,
  generateRandomCard,
  calcCardsSum,
  changeAceValue
) => {
  if (dealerSum > 17) {
    return [dealerCards, dealerSum];
  } else {
    // Dealer gets cards until the dealer sum is no longer less than 17
    while (dealerSum < 17) {
      const newCardDealer = generateRandomCard();
      dealerCards.push(newCardDealer);
      dealerSum = calcCardsSum(dealerCards);
    }

    if (dealerSum <= 21) {
      return [dealerCards, dealerSum];
    } else {
      if (wasDealerAceChangeDone) {
        return [dealerCards, dealerSum];
      } else {
        // Make ace value adjustment
        dealerCards = changeAceValue(dealerCards);
        dealerSum = calcCardsSum(dealerCards);

        // Dealer gets cards after the ace adjustment
        while (dealerSum < 17) {
          const newCardDealer = generateRandomCard();
          dealerCards.push(newCardDealer);
          dealerSum = calcCardsSum(dealerCards);
        }

        return [dealerCards, dealerSum];
      }
    }
  }
};
