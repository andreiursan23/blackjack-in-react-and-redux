// React imports
import React from "react";
// Styles imports
import styles from "./PlayerControlsBtn.module.css";

// ---- Actual component ----
function PlayerControlsBtn({ title, isDisabled }) {
  return (
    <button className={styles.button} disabled={isDisabled}>
      {title}
    </button>
  );
}

export default PlayerControlsBtn;
