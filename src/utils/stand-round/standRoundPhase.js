export const standRoundPhase = (
  currentGameStates,
  generateRandomCard,
  calcCardsSum,
  changeAceValue
) => {
  let result = {
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

  result.playerCards = [...currentGameStates.player.cards];
  result.playerSum = [currentGameStates.player.sum];
  result.wasPlayerAceChangeDone = currentGameStates.player.wasAceChangeDone;
  result.dealerCards = [...currentGameStates.dealer.cards];
  result.dealerSum = [currentGameStates.dealer.sum];
  result.wasDealerAceChangeDone = currentGameStates.dealer.wasAceChangeDone;
  result.gamePhase = currentGameStates.game.phase;

  // Dealer gets cards until the dealer sum is no longer less than 17
  while (result.dealerSum < 17) {
    const newCardDealer = generateRandomCard();
    result.dealerCards = [...result.dealerCards, newCardDealer];
    result.dealerSum = calcCardsSum(result.dealerCards);
  }

  // If dealer sum is over 21 after new cards drawn, check if there is an Ace
  if (result.dealerSum > 21) {
    // Change ace value if dealer sum is more than 21
    if (!result.wasDealerAceChangeDone) {
      if (result.dealerCards.includes(11)) {
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
      }
    }
  }

  if (result.dealerSum > 21) {
    result.playerWon = true;
  } else {
    if (result.dealerSum === result.playerSum) {
      result.gameTied = true;
    } else if (result.dealerSum < result.playerSum) {
      result.playerWon = true;
    } else {
      result.playerLost = true;
    }
  }

  return result;
};
