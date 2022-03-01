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
    isAlive: true,
    hasWon: false,
    wasAceChangeDone: false,
  },
  dealer: {
    cards: [],
    sum: null,
    isAlive: true,
    hasWon: false,
    wasAceChangeDone: false,
  },
};

const gameLogicSlice = createSlice({
  name: "gameLogic",
  initialState: initialState,
  reducers: {
    // Game reducers
    changeGamesStatus(state, action) {
      switch (action.payload) {
        case "welcome":
          state.game.statusMsg = gameMessages.welcome;
          break;
        case "player_won_blackjack":
          state.game.statusMsg = gameMessages.playerWon.blackjack;
          break;
        case "player_won_normal":
          state.game.statusMsg = gameMessages.playerWon.normal;
          break;
        case "player_lost":
          state.game.statusMsg = gameMessages.playerLost;
          break;
        case "tied_round":
          state.game.statusMsg = gameMessages.tiedRound;
          break;
        case "draw_or_stand":
          state.game.statusMsg = gameMessages.drawOrStand;
          break;
        default:
          break;
      }
    },
    changeGamesPhase(state, action) {
      state.game.phase = action.payload;
    },
    changeCurrentStake(state, action) {
      state.game.currentStake = action.payload;
    },
    updateBtnAvailability(state, action) {
      state.game.isStartGameBtnDisabled = action.payload[0];
      state.game.isNewCardBtnDisabled = action.payload[1];
      state.game.isStandRoundBtnDisabled = action.payload[2];
    },

    // Player reducers
    updatePlayerCards(state, action) {
      if (!action.payload) {
        state.player.cards = [];
      } else {
        action.payload.forEach((card) => {
          state.player.cards.push(card);
        });
      }
    },
    updatePlayerSum(state, action) {
      if (!action.payload) {
        state.player.sum = null;
      } else {
        let sum = 0;

        action.payload.forEach((card) => {
          sum += card;
        });

        state.player.sum = sum;
      }
    },
    updatePlayerChips(state, action) {
      state.player.chips = action.payload;
    },
    updatePlayerIsAlive(state, action) {
      state.player.isAlive = action.payload;
    },
    updatePlayerHasWon(state, action) {
      state.player.hasWon = action.payload;
    },
    updatePlayerWasAceChangeDone(state, action) {
      state.player.wasAceChangeDone = action.payload;
    },

    // Dealer reducers
    updateDealerCards(state, action) {
      if (!action.payload) {
        state.dealer.cards = [];
      } else {
        action.payload.forEach((card) => {
          state.dealer.cards.push(card);
        });
      }
    },
    updateDealerSum(state, action) {
      if (!action.payload) {
        state.dealer.sum = null;
      } else {
        let sum = 0;

        action.payload.forEach((card) => {
          sum += card;
        });

        state.dealer.sum = sum;
      }
    },
    updateDealerIsAlive(state, action) {
      state.dealer.isAlive = action.payload;
    },
    updateDealerHasWon(state, action) {
      state.dealer.hasWon = action.payload;
    },
    updateDealerWasAceChangeDone(state, action) {
      state.dealer.wasAceChangeDone = action.payload;
    },
  },
});

export const gameLogicActions = gameLogicSlice.actions;
export default gameLogicSlice.reducer;
