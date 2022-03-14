import React from "react";

import styles from "./DealerDisplay.module.css";

import { useSelector } from "react-redux";

import { displayAllCards } from "../../utils/helperFunctions";

function DealerDisplay() {
  const dealerCards = useSelector((state) => state.gameLogic.dealer.cards);
  const dealerCardsSum = useSelector((state) => state.gameLogic.dealer.sum);

  return (
    <div className={styles.container}>
      <div className={styles.cards_container}>
        <p className={styles.cards}>Dealer's Cards:</p>
        <p className={styles.cards_values}>{displayAllCards(dealerCards)}</p>
      </div>
      <div className={styles.sum_container}>
        <p className={styles.cards}>Sum:</p>
        <p className={styles.cards_values}>{dealerCardsSum}</p>
      </div>
    </div>
  );
}

export default DealerDisplay;

/*
  Cand dau click pe suma pe care vreau sa o pariez, intru in faza "betting"
  In faza "betting" nu afisez nicio carte sau suma
  Dupa ce dau click pe Start Game, trec in faza "ongoing" cand afisez doar o carte a dealer-ului
  Atunci cand jocul se termina, trec in faza "conclusion" cand afisez toate cartile

  Functie de render a cartilor in functie de game phase
*/