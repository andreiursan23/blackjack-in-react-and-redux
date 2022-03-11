export const newCardPhase = (
  currentGameStates,
  generateRandomCard,
  calcCardsSum,
  changeAceValue,
  dealerGameWhenPlayerHasBlackjack
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

  const newCardPlayer = generateRandomCard();
  result.playerCards = [...result.playerCards, newCardPlayer];
  result.playerSum = calcCardsSum(result.playerCards);

  if (result.playerSum === 21) {
    result = dealerGameWhenPlayerHasBlackjack(
      result,
      generateRandomCard,
      calcCardsSum,
      changeAceValue
    );
  } else if (result.playerSum > 21) {
    // Case below: player cards sum is more than 21
    if (result.wasPlayerAceChangeDone) {
      // Player lost steps to be added here
      result.playerLost = true;
    } else {
      // See if player has an ace in hand
      if (result.playerCards.includes(11)) {
        // Change the value of the ace
        result.playerCards = changeAceValue(result.playerCards);
        result.playerSum = calcCardsSum(result.playerCards);
        result.wasPlayerAceChangeDone = true;

        if (result.playerSum === 21) {
          // Check if player now has blackjack
          result = dealerGameWhenPlayerHasBlackjack(
            result,
            generateRandomCard,
            calcCardsSum,
            changeAceValue
          );
        }
      } else {
        // Case below: player does not have ace in hand and player cards sum is more than 21
        result.playerLost = true;
      }
    }
  }

  return result;
};
