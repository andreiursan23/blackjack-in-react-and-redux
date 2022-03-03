import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { gameLogicActions } from "../../store/game-logic/game-logic-slice";

import {
  generateRandomCard,
  calcCardsSum,
  evaluateGameBlackjack,
  changeAceValue,
} from "../../utils/helperFunctions";

import PlayerControlsBtn from "../../ui/PlayerControlsBtn/PlayerControlsBtn";

function StartGame() {
  const dispatch = useDispatch();
  const isStartGameBtnDisabled = useSelector(
    (state) => state.gameLogic.game.isStartGameBtnDisabled
  );
  const currentStake = useSelector(
    (state) => state.gameLogic.game.currentStake
  );
  const playerChips = useSelector((state) => state.gameLogic.player.chips);
  let playerCards = useSelector((state) => state.gameLogic.player.cards);
  let playerSum = useSelector((state) => state.gameLogic.player.sum);
  let dealerCards = useSelector((state) => state.gameLogic.dealer.cards);
  let dealerSum = useSelector((state) => state.gameLogic.dealer.sum);

  const trackAceValueChangeWhenBothCardsAreAces = (card1, card2) => {
    if (card1 === 11 && card2 === 11) {
      return true;
    } else {
      return false;
    }
  };

  const endGamePlayerWon = () => {
    dispatch(gameLogicActions.changeGamesStatus("player_won_blackjack"));
    dispatch(gameLogicActions.changeGamesPhase("betting"));
    dispatch(gameLogicActions.updateBtnAvailability([true, true, true]));
    dispatch(
      gameLogicActions.updatePlayerChips(playerChips + 2 * currentStake)
    );
    dispatch(gameLogicActions.changeCurrentStake(null));
  };

  const endGameTiedRound = () => {
    dispatch(gameLogicActions.changeGamesStatus("tied_round"));
    dispatch(gameLogicActions.changeGamesPhase("betting"));
    dispatch(gameLogicActions.updateBtnAvailability([true, true, true]));
    dispatch(gameLogicActions.updatePlayerChips(playerChips + currentStake));
    dispatch(gameLogicActions.changeCurrentStake(null));
  };

  const handleStartGame = () => {
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
    playerCards = [10, 11];
    dealerCards = [card1Dealer, card2Dealer];

    // Evaluate if player and/or dealer has blackjack
    playerSum = calcCardsSum(playerCards);
    dealerSum = calcCardsSum(dealerCards);
    const hasPlayerBlackjack = evaluateGameBlackjack(playerSum);
    const hasDealerBlackjack = evaluateGameBlackjack(dealerSum);

    if (hasPlayerBlackjack && hasDealerBlackjack) {
      endGameTiedRound();
    } else if (hasPlayerBlackjack) {
      // Dealer gets cards until the dealer sum is no longer less than 17
      while (dealerSum < 17) {
        const newCardDealer = generateRandomCard();
        dealerCards.push(newCardDealer);
        dealerSum = calcCardsSum(dealerCards);
      }

      // Reevaluate the dealer sum, after new cards got
      if (dealerSum === 21) {
        endGameTiedRound();
      } else if (dealerSum > 21 || dealerSum < 21) {
        if (wasDealerAceChangeDone) {
          endGamePlayerWon();
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
            endGameTiedRound();
          } else {
            endGamePlayerWon();
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

  return (
    <div onClick={handleStartGame}>
      <PlayerControlsBtn
        title={"Start game"}
        isDisabled={isStartGameBtnDisabled}
      />
    </div>
  );
}

export default StartGame;
