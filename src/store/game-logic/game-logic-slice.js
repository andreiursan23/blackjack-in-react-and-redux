import { createSlice } from "@reduxjs/toolkit";
import { gameMessages } from "../../database/gameMessages";

const initialState = {
  game: {
    statusMsg: gameMessages.welcome,
    phase: "betting",
    currentStake: null,
    isStartGameBtnDisabled: true,
    isNewCardBtnDisabled: true,
    isStandRoundBtnDisabled: true,
  },
  player: {
    cards: [],
    sum: null,
    chips: 1000,
    wasAceChangeDone: false,
  },
  dealer: {
    cards: [],
    sum: null,
    wasAceChangeDone: false,
  },
};

const gameLogicSlice = createSlice({
  name: "gameLogic",
  initialState: initialState,
  reducers: {
    selectBetValueSteps(state, action) {
      // Reset game after the previous game was played
      // state.player.cards = null;
      // state.player.sum = null;
      // state.dealer.cards = null;
      // state.dealer.sum = null;

      // Start new bet stake selection
      state.game.currentStake = action.payload;
      state.game.phase = "ongoing";

      state.player.chips -= action.payload;
      state.game.isStartGameBtnDisabled = false;
      state.game.isNewCardBtnDisabled = true;
      state.game.isStandRoundBtnDisabled = true;
    },

    renderGame(state, action) {
      state.player.cards = action.payload.playerCards;
      state.player.sum = action.payload.playerSum;
      state.dealer.cards = action.payload.dealerCards;
      state.dealer.sum = action.payload.dealerSum;
      state.player.wasAceChangeDone = action.payload.wasPlayerAceChangeDone;
      state.dealer.wasAceChangeDone = action.payload.wasDealerAceChangeDone;
    },

    endGamePlayerWonBlackjack(state) {
      state.game.statusMsg = gameMessages.playerWon.blackjack;
      state.game.phase = "betting";
      state.game.isStartGameBtnDisabled = true;
      state.game.isNewCardBtnDisabled = true;
      state.game.isStandRoundBtnDisabled = true;
      state.player.chips = state.player.chips + 2 * state.game.currentStake;
      state.game.currentStake = 0;
    },

    endGamePlayerWon(state) {
      state.game.statusMsg = gameMessages.playerWon.normal;
      state.game.phase = "betting";
      state.game.isStartGameBtnDisabled = true;
      state.game.isNewCardBtnDisabled = true;
      state.game.isStandRoundBtnDisabled = true;
      state.player.chips = state.player.chips + 2 * state.game.currentStake;
      state.game.currentStake = null;
    },

    endGamePlayerLost(state) {
      state.game.statusMsg = gameMessages.playerLost;
      state.game.phase = "betting";
      state.game.isStartGameBtnDisabled = true;
      state.game.isNewCardBtnDisabled = true;
      state.game.isStandRoundBtnDisabled = true;
      state.game.currentStake = null;
    },

    endGameTiedRound(state) {
      state.game.statusMsg = gameMessages.tiedRound;
      state.game.phase = "betting";
      state.game.isStartGameBtnDisabled = true;
      state.game.isNewCardBtnDisabled = true;
      state.game.isStandRoundBtnDisabled = true;
      state.player.chips = state.player.chips + state.game.currentStake;
      state.game.currentStake = null;
    },
    gameNotDecided(state) {
      state.game.statusMsg = gameMessages.drawOrStand;
      state.game.phase = "ongoing";
      state.game.isStartGameBtnDisabled = true;
      state.game.isNewCardBtnDisabled = false;
      state.game.isStandRoundBtnDisabled = false;
    },
  },
});

export const gameLogicActions = gameLogicSlice.actions;
export default gameLogicSlice.reducer;
