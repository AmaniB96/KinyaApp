"use client";

import styles from './ProgressBar.module.css';

const ProgressBar = ({ progress, height = "8px", width = "100%" }) => {
  return (
    <div className={styles.progressBarContainer} style={{ height, width }}>
      <div
        className={styles.progressBarFill}
        style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
      />
    </div>
  );
};

export default ProgressBar;