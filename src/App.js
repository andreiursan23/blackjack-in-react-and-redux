import "./App.css";
import styles from "./App.module.css";

import React from "react";

import Title from "./components/Title/Title";
import CardsDisplay from "./components/CardsDisplay/CardsDisplay";
import GameStatus from "./components/GameStatus/GameStatus";
import BetDisplay from "./components/BetDisplay/BetDisplay";
import PlayerChipsAndStake from "./components/PlayerChipsAndStake/PlayerChipsAndStake";
import PlayerControls from "./components/PlayerControls/PlayerControls";

function App() {
  // Game phases:
  // 1. betting
  // 2. ongoing
  // 3. conclusion ? don't think I need it

  return (
    <>
      <div className={styles.container}>
        <Title />

        <CardsDisplay side={"Dealer"} />

        <BetDisplay />

        <CardsDisplay side={"Player"} />

        <GameStatus />

        <PlayerChipsAndStake />

        <PlayerControls />
      </div>
    </>
  );
}

export default App;
