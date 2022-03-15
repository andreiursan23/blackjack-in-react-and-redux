export const startGamePhase = (
  generateRandomCard,
  trackAceValueChangeWhenBothCardsAreAces,
  calcCardsSum,
  evaluateGameBlackjack,
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

  // Generate cards for each side
  let card1Player = generateRandomCard();
  let card2Player = generateRandomCard();
  let card1Dealer = generateRandomCard();
  let card2Dealer = generateRandomCard();

  // Check if both initial cards are Aces
  result.wasPlayerAceChangeDone = trackAceValueChangeWhenBothCardsAreAces(
    card1Player,
    card2Player
  );
  result.wasDealerAceChangeDone = trackAceValueChangeWhenBothCardsAreAces(
    card1Dealer,
    card2Dealer
  );

  // Change Ace value from 11 to 1 for player if both initial card are Aces
  if (result.wasPlayerAceChangeDone) {
    card1Player = 1;
  }
  // Change Ace value from 11 to 1 for dealer if both initial card are Aces
  if (result.wasDealerAceChangeDone) {
    card1Dealer = 1;
  }

  // Create the two arrays of cards
  result.playerCards = [card1Player, card2Player];
  result.dealerCards = [card1Dealer, card2Dealer];

  // Evaluate if player and/or dealer has blackjack
  result.playerSum = calcCardsSum(result.playerCards);
  result.dealerSum = calcCardsSum(result.dealerCards);
  const hasPlayerBlackjack = evaluateGameBlackjack(result.playerSum);
  const hasDealerBlackjack = evaluateGameBlackjack(result.dealerSum);

  // Check each possible case:
  // 1. Both sides have blackjack
  if (hasPlayerBlackjack && hasDealerBlackjack) {
    result.gameTied = true;
  }

  // 2. Player has blackjack
  if (hasPlayerBlackjack) {
    result = dealerGameWhenPlayerHasBlackjack(
      result,
      generateRandomCard,
      calcCardsSum,
      changeAceValue
    );
  }

  // 3. None of the sides have blackjack
  if (!hasPlayerBlackjack && !hasDealerBlackjack) {
    // Steps when neither side has blackjack
    result.gamePhase = "ongoing";
  }

  return result;
};
