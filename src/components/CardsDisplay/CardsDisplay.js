import styles from "./CardsDisplay.module.css";
import React from "react";

import { useSelector } from "react-redux";

function CardsDisplay({ side }) {
  const gamePhase = useSelector((state) => state.gameLogic.game.phase);

  let cardsSum = null;
  let cards = [];

  const playerCards = useSelector((state) => state.gameLogic.player.cards);
  const playerCardsSum = useSelector((state) => state.gameLogic.player.sum);
  const dealerCards = useSelector((state) => state.gameLogic.dealer.cards);
  const dealerCardsSum = useSelector((state) => state.gameLogic.dealer.sum);

  // TO DO: see if this can be transformed into functions that can be imported
  if (side === "Player") {
    cards = playerCards;
    cardsSum = playerCardsSum;
  } else {
    cards = dealerCards;
    cardsSum = dealerCardsSum;
  }

  const showAllCards = (inputCards) => {
    let formattedCards = "";
    inputCards.forEach((card) => (formattedCards += `${card} `));
    return formattedCards;
  };

  const showSecondCardOnly = (inputCards, inputSide) => {
    let formattedCards = "";
    if (inputSide === "Dealer") {
      inputCards.slice(1).forEach((card) => (formattedCards += `${card} `));
      return formattedCards;
    } else {
      return showAllCards(inputCards);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cards_container}>
        <p className={styles.cards}>{side}'s Cards:</p>
        <p className={styles.cards_values}>
          {gamePhase !== "betting"
            ? showSecondCardOnly(cards, side)
            : showAllCards(cards)}
        </p>
      </div>
      <div className={styles.sum_container}>
        <p className={styles.cards}>Sum:</p>
        <p className={styles.cards_values}>
          {side === "Player" || gamePhase === "betting" ? cardsSum : cards[1]}
        </p>
      </div>
    </div>
  );
}

export default CardsDisplay;
