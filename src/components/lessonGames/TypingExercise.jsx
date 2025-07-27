"use client";

import { useState } from "react";
import styles from "./TypingExercise.module.css";

const TypingExercise = ({ exercise, onComplete, progress }) => {
  const [input, setInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const handleCheck = () => {
    setShowFeedback(true);
    if (input.trim().toLowerCase() === exercise.answer.trim().toLowerCase()) {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className={`${styles.exerciseContainer} glass-effect`}>
      <div className={styles.progressIndicator}>{progress}</div>
      <h2 className={styles.exerciseTitle}>{exercise.instruction}</h2>
      <input
        className={styles.input}
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={showFeedback}
        placeholder="Type your answer"
      />
      <div className={styles.feedbackArea}>
        {showFeedback && (
          <div className={input.trim().toLowerCase() === exercise.answer.trim().toLowerCase() ? styles.correct : styles.incorrect}>
            {input.trim().toLowerCase() === exercise.answer.trim().toLowerCase() ? "Correct!" : "Try again!"}
          </div>
        )}
        {!showFeedback && (
          <button
            className={`btn btn-primary ${styles.checkBtn}`}
            onClick={handleCheck}
            disabled={!input}
          >
            Check Answer
          </button>
        )}
        {/* Show Retry button if incorrect */}
        {showFeedback && input.trim().toLowerCase() !== exercise.answer.trim().toLowerCase() && (
          <button
            className={`btn btn-secondary ${styles.retryBtn}`}
            onClick={() => {
              setShowFeedback(false);
              setInput("");
            }}
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default TypingExercise;