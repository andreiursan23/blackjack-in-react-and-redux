// React imports
import React from "react";
// Components imports
import StartGame from "./StartGame";
import NewCard from "./NewCard";
import StandRound from "./StandRound";

// ---- Actual component ----
function PlayerControls() {
  return (
    <>
      <StartGame />
      <NewCard />
      <StandRound />
    </>
  );
}

export default PlayerControls;
