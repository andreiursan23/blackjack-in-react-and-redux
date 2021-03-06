// React imports
import React from "react";
// Styles imports
import "./App.css";
import styles from "./App.module.css";
// Components imports
import Title from "./components/Title/Title";
import DealerDisplay from "./components/DealerControls/DealerDisplay";
import BetDisplay from "./components/BetDisplay/BetDisplay";
import PlayerDisplay from "./components/PlayerDisplay/PlayerDisplay";
import GameStatus from "./components/GameStatus/GameStatus";
import PlayerChipsAndStake from "./components/PlayerChipsAndStake/PlayerChipsAndStake";
import PlayerControls from "./components/PlayerControls/PlayerControls";

// ---- Actual component ----
function App() {
  return (
    <div className={styles.container}>
      <Title />

      <DealerDisplay />

      <BetDisplay />

      <PlayerDisplay />

      <GameStatus />

      <PlayerChipsAndStake />

      <PlayerControls />
    </div>
  );
}

export default App;
