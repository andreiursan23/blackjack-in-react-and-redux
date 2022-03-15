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

export const trackAceValueChangeWhenBothCardsAreAces = (card1, card2) => {
  if (card1 === 11 && card2 === 11) {
    return true;
  } else {
    return false;
  }
};

export const displayAllCards = (inputCards) => {
  let formattedCards = "";
  inputCards.forEach((card) => (formattedCards += `${card} `));
  return formattedCards;
};

export const displayPlayerCards = (inputCards, gamePhase) => {
  let cardsDisplayed = "";

  switch (gamePhase) {
    case "betting":
      return null;
    case "ongoing":
      inputCards.forEach((card) => (cardsDisplayed += `${card} `));
      return cardsDisplayed;
    case "conclusion":
      inputCards.forEach((card) => (cardsDisplayed += `${card} `));
      return cardsDisplayed;
    default:
      console.log("Something went wrong");
      break;
  }
};

export const displayPlayerSum = (inputSum, gamePhase) => {
  switch (gamePhase) {
    case "betting":
      return null;
    case "ongoing":
      return inputSum;
    case "conclusion":
      return inputSum;
    default:
      console.log("Something went wrong");
      break;
  }
};

export const displayDealerCards = (inputCards, gamePhase) => {
  let cardsDisplayed = "";

  switch (gamePhase) {
    case "betting":
      return null;
    case "ongoing":
      return inputCards[0];
    case "conclusion":
      inputCards.forEach((card) => (cardsDisplayed += `${card} `));
      return cardsDisplayed;
    default:
      console.log("Something went wrong");
      break;
  }
};

export const displayDealerSum = (inputSum, inputCards, gamePhase) => {
  switch (gamePhase) {
    case "betting":
      return null;
    case "ongoing":
      return inputCards[0];
    case "conclusion":
      return inputSum;
    default:
      console.log("Something went wrong");
      break;
  }
};

// export const displaySecondCardOnly = (inputCards, inputSide) => {
//   let formattedCards = "";
//   if (inputSide === "Dealer") {
//     inputCards.slice(1).forEach((card) => (formattedCards += `${card} `));
//     return formattedCards;
//   } else {
//     return inputCards;
//   }
// };

export const dealerGameWhenPlayerHasBlackjack = (
  currentParams,
  generateRandomCard,
  calcCardsSum,
  changeAceValue
) => {
  const result = {
    playerCards: [],
    playerSum: null,
    wasPlayerAceChangeDone: false,
    dealerCards: [],
    dealerSum: null,
    wasDealerAceChangeDone: false,
    playerWon: false,
    playerLost: false,
    gameTied: false,
    gamePhase: "betting",
  };

  result.playerCards = currentParams.playerCards;
  result.playerSum = currentParams.playerSum;
  result.wasPlayerAceChangeDone = currentParams.wasPlayerAceChangeDone;
  result.dealerCards = currentParams.dealerCards;
  result.dealerSum = currentParams.dealerSum;
  result.wasDealerAceChangeDone = currentParams.wasDealerAceChangeDone;
  result.gamePhase = currentParams.gamePhase;

  if (result.dealerSum >= 17) {
    result.playerWon = true;
  }

  // Dealer gets cards until the dealer sum is no longer less than 17
  while (result.dealerSum < 17) {
    const newCardDealer = generateRandomCard();
    result.dealerCards = [...result.dealerCards, newCardDealer];
    result.dealerSum = calcCardsSum(result.dealerCards);
  }

  // Reevaluate the dealer sum, after new cards received
  // Check if dealer has blackjack
  if (result.dealerSum === 21) {
    result.gameTied = true;
  }

  // Check if dealer sum is more than 21
  if (result.dealerSum > 21) {
    // End game if ace change for dealer was done
    if (result.wasDealerAceChangeDone) {
      result.playerWon = true;
    } else {
      // If ace change wasn't done, check if dealer cards include an ace
      if (!result.dealerCards.includes(11)) {
        // End game is dealer cards don't include ace
        result.playerWon = true;
      } else {
        // Ace adjustment for dealer cards
        result.dealerCards = changeAceValue(result.dealerCards);
        result.dealerSum = calcCardsSum(result.dealerCards);
        result.wasDealerAceChangeDone = true;

        // Dealer gets new cards, if needed, after the ace adjustment
        while (result.dealerSum < 17) {
          const newCardDealer = generateRandomCard();
          result.dealerCards = [...result.dealerCards, newCardDealer];
          result.dealerSum = calcCardsSum(result.dealerCards);
        }

        // Check if dealer has blackjack after ace adjustment and potential new cards drawn
        if (result.dealerSum === 21) {
          result.gameTied = true;
        } else {
          result.playerWon = true;
        }
      }
    }
  }

  // Check if dealer sum is still less than 21
  if (result.dealerSum < 21) {
    result.playerWon = true;
  }

  return result;
};
