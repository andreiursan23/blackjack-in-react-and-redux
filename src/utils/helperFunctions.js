/*

Functions that need to become helper functions:

1. generateRandomCard - done
2. changeAceValue  - done
3. updateCardsSum - replaced by useState
4. calcCardsSum - done
5. renderGame: - might not be needed
  5.1 calcCardsSum
  5.2 changeAceValue
  5.3 updateCardsSum
6. dealerGame:
  6.1 generateRandomCard
  6.2 calcCardsSum
  6.3 changeAceValue
  6.4 updateCardsSum
7. evaluateGameState - done
8. evaluateGameBlackjack - done
9. evaluateGameWon - done
10. updatePlayerChips - done
11. endGameSteps
  11.1 renderGame
  11.2 establishPrizeWinner

*/

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
