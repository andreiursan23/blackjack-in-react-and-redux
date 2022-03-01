import { configureStore } from "@reduxjs/toolkit";
import gameLogicSlice from "./game-logic/game-logic-slice";

const store = configureStore({
  reducer: {
    gameLogic: gameLogicSlice,
  },
});

export default store;
