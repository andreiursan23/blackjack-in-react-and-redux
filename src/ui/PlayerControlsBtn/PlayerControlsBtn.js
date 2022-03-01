import React from "react";

import styles from "./PlayerControlsBtn.module.css";

function PlayerControlsBtn({ title, isDisabled }) {
  return (
    <button className={styles.button} disabled={isDisabled}>
      {title}
    </button>
  );
}

export default PlayerControlsBtn;
