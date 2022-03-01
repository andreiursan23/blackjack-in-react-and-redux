import React from "react";

import StartGame from "./StartGame";
import NewCard from "./NewCard";
import StandRound from "./StandRound";

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
