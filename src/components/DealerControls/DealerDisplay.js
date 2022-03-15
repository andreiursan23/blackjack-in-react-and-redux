// React imports
import React from "react";
// Redux imports
import { useSelector } from "react-redux";
// Styles imports
import styles from "./DealerDisplay.module.css";
// Helper functions imports
import {
  displayDealerCards,
  displayDealerSum,
} from "../../utils/helperFunctions";

// ---- Actual component ----
function DealerDisplay() {
  const gamePhase = useSelector((state) => state.gameLogic.game.phase);
  const dealerCards = useSelector((state) => state.gameLogic.dealer.cards);
  const dealerCardsSum = useSelector((state) => state.gameLogic.dealer.sum);

  return (
    <div className={styles.container}>
      <div className={styles.cards_container}>
        <p className={styles.cards}>Dealer's Cards:</p>
        <p className={styles.cards_values}>
          {displayDealerCards(dealerCards, gamePhase)}
        </p>
      </div>
      <div className={styles.sum_container}>
        <p className={styles.cards}>Sum:</p>
        <p className={styles.cards_values}>
          {displayDealerSum(dealerCardsSum, dealerCards, gamePhase)}
        </p>
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
