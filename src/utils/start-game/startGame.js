import {
  generateRandomCard,
  calcCardsSum,
  evaluateGameBlackjack,
  changeAceValue,
} from "../helperFunctions";

import {
  trackAceValueChangeWhenBothCardsAreAces,
  endGameTiedRound,
  endGamePlayerWon,
} from "./helpers";

export const startGame = (
  dispatch,
  gameLogicActions,
  playerChips,
  currentStake
) => {
  // Generate cards and "is card Ace" states
  let card1Player = generateRandomCard();
  let card2Player = generateRandomCard();
  let card1Dealer = generateRandomCard();
  let card2Dealer = generateRandomCard();

  let wasPlayerAceChangeDone = false;
  let wasDealerAceChangeDone = false;

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
  const playerCards = [card1Player, card2Player];
  let dealerCards = [card1Dealer, card2Dealer];

  // Evaluate if player and/or dealer has blackjack
  const playerSum = calcCardsSum(playerCards);
  let dealerSum = calcCardsSum(dealerCards);
  const hasPlayerBlackjack = evaluateGameBlackjack(playerSum);
  const hasDealerBlackjack = evaluateGameBlackjack(dealerSum);

  if (hasPlayerBlackjack && hasDealerBlackjack) {
    endGameTiedRound(dispatch, gameLogicActions, playerChips, currentStake);
  } else if (hasPlayerBlackjack) {
    // Dealer gets cards until the dealer sum is no longer less than 17
    while (dealerSum < 17) {
      const newCardDealer = generateRandomCard();
      dealerCards.push(newCardDealer);
      dealerSum = calcCardsSum(dealerCards);
    }

    // Reevaluate the dealer sum, after new cards got
    if (dealerSum === 21) {
      endGameTiedRound(dispatch, gameLogicActions, playerChips, currentStake);
    } else if (dealerSum > 21 || dealerSum < 21) {
      if (wasDealerAceChangeDone) {
        endGamePlayerWon(dispatch, gameLogicActions, playerChips, currentStake);
      } else {
        dealerCards = changeAceValue(dealerCards);

        // Dealer gets new cards, if needed, after the ace adjustment
        while (dealerSum < 17) {
          const newCardDealer = generateRandomCard();
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

    console.log(dealerCards);
  } else {
    // Steps when neither side has blackjack
    dispatch(gameLogicActions.changeGamesPhase("ongoing"));
    dispatch(gameLogicActions.changeGamesStatus("draw_or_stand"));
    dispatch(gameLogicActions.updateBtnAvailability([true, false, false]));
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
