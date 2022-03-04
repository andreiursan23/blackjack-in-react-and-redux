export const standRoundPhase = (
  inputDealerCards,
  dealerSum,
  wasDealerAceChangeDone,
  playerSum,
  playerChips,
  currentStake,
  dispatch,
  gameLogicActions,
  dealerGameWhenPlayerStandsRound,
  endGamePlayerWon,
  endGameTiedRound,
  endGamePlayerLost,
  generateRandomCard,
  calcCardsSum,
  changeAceValue
) => {
  // 1. Dealer-ul trebuie sa isi joace mana, dar fara a fi concluzionata runda
  //    1.1. Daca suma este mai mare decat 17, returnam suma cartilor.
  //    1.2. Daca suma este mai mica decat 17, atunci trebuie sa traga carti pana cand depaseste 17
  //    1.3. Daca e mai mica sau egala decat 21, atunci returnam suma cartilor
  //    1.4. Daca depaseste 21, verificam daca a fost facuta schimbarea valorii asului
  //    1.5. Daca a fost facuta, returnam suma cartilor.
  //    1.6. Daca nu a fost facuta, o facem acum si revenim la punctul 1.1
  // 2. Daca dealer-ul a depasit 21, atunci automat jucatorul castiga runda
  // 3. In caz contrar punctului 3, trebuie calculata si salvata suma cartilor jucatorului
  // 4. Daca cele doua sume sunt EGALE, este egalitate
  // 5. Daca suma jucatorului este mai MARE decat a dealer-ului, jucatorul a castigat
  // 6. Daca suma jucatorului este mai MICA decat a dealer-ului, jucatorul a pierdut
  // 7. Resetata starea jocului inapoi la Betting phase
  let dealerCards = [...inputDealerCards];

  [dealerCards, dealerSum] = dealerGameWhenPlayerStandsRound(
    dealerSum,
    dealerCards,
    wasDealerAceChangeDone,
    generateRandomCard,
    calcCardsSum,
    changeAceValue
  );

  if (dealerSum > 21) {
    endGamePlayerWon(dispatch, gameLogicActions, playerChips, currentStake);
  } else {
    if (dealerSum === playerSum) {
      endGameTiedRound(dispatch, gameLogicActions, playerChips, currentStake);
    } else if (dealerSum < playerSum) {
      endGamePlayerWon(dispatch, gameLogicActions, playerChips, currentStake);
    } else {
      endGamePlayerLost(dispatch, gameLogicActions, playerChips, currentStake);
    }
  }

  // Save all needed values to Redux store
  // Player and dealer cards
  dispatch(gameLogicActions.updateDealerCards(dealerCards));
  // Player and dealer cards sum
  dispatch(gameLogicActions.updateDealerSum(dealerCards));
  // Player and dealer was ace value changed states
  dispatch(gameLogicActions.updateDealerWasAceChangeDone(false));
};
