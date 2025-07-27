"use client";

import { useState } from "react";
import styles from "./FillGapExercise.module.css";

const FillGapExercise = ({ exercise, onComplete, progress }) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (option) => {
    if (showFeedback) return;
    setSelected(option);
  };

  const handleCheck = () => {
    setShowFeedback(true);
    if (selected === exercise.answer) {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className={`${styles.exerciseContainer} glass-effect`}>
      <div className={styles.progressIndicator}>{progress}</div>
      <h2 className={styles.exerciseTitle}>{exercise.instruction}</h2>
      <div className={styles.sentence}>
        {exercise.sentence.split("____").map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && (
              <span className={styles.gap}>
                {selected ? (
                  <span className={styles.selectedOption}>{selected}</span>
                ) : (
                  <span className={styles.emptyGap}>______</span>
                )}
              </span>
            )}
          </span>
        ))}
      </div>
      <div className={styles.options}>
        {exercise.options.map((option, idx) => (
          <button
            key={idx}
            className={`${styles.optionBtn} ${selected === option ? styles.selected : ""}`}
            onClick={() => handleSelect(option)}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>
      <div className={styles.feedbackArea}>
        {showFeedback && (
          <div className={selected === exercise.answer ? styles.correct : styles.incorrect}>
            {selected === exercise.answer ? "Correct!" : "Try again!"}
          </div>
        )}
        {!showFeedback && (
          <button
            className={`btn btn-primary ${styles.checkBtn}`}
            onClick={handleCheck}
            disabled={!selected}
          >
            Check Answer
          </button>
        )}
        {showFeedback && selected !== exercise.answer && (
          <button
            className={`btn btn-secondary ${styles.retryBtn}`}
            onClick={() => {
              setShowFeedback(false);
              setSelected(null);
            }}
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default FillGapExercise;