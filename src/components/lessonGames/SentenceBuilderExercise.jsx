"use client";

import { useState } from "react";
import styles from "./SentenceBuilderExercise.module.css";

const shuffle = arr => arr.slice().sort(() => Math.random() - 0.5);

const SentenceBuilderExercise = ({ exercise, onComplete, progress }) => {
  const [words, setWords] = useState(shuffle(exercise.words));
  const [selected, setSelected] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleWordClick = (word) => {
    if (showFeedback) return;
    setSelected([...selected, word]);
    setWords(words.filter(w => w !== word));
  };

  const handleReset = () => {
    setWords(shuffle(exercise.words));
    setSelected([]);
    setShowFeedback(false);
  };

  const handleCheck = () => {
    setShowFeedback(true);
    if (selected.join(" ") === exercise.answer.join(" ")) {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className={`${styles.exerciseContainer} glass-effect`}>
      <div className={styles.progressIndicator}>{progress}</div>
      <h2 className={styles.exerciseTitle}>{exercise.instruction}</h2>
      <div className={styles.selectedSentence}>
        {selected.map((word, i) => (
          <span key={i} className={styles.selectedWord}>{word}</span>
        ))}
      </div>
      <div className={styles.wordBank}>
        {words.map((word, i) => (
          <button
            key={i}
            className={styles.wordBtn}
            onClick={() => handleWordClick(word)}
          >
            {word}
          </button>
        ))}
      </div>
      <div className={styles.feedbackArea}>
        {showFeedback && (
          <div className={selected.join(" ") === exercise.answer.join(" ") ? styles.correct : styles.incorrect}>
            {selected.join(" ") === exercise.answer.join(" ") ? "Correct!" : "Try again!"}
          </div>
        )}
        {!showFeedback && (
          <button
            className={`btn btn-primary ${styles.checkBtn}`}
            onClick={handleCheck}
            disabled={selected.length !== exercise.words.length}
          >
            Check Answer
          </button>
        )}
        {showFeedback && selected.join(" ") !== exercise.answer.join(" ") && (
          <button
            className={`btn btn-secondary ${styles.retryBtn}`}
            onClick={() => {
              setShowFeedback(false);
              setSelected([]);
              setWords(shuffle(exercise.words));
            }}
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default SentenceBuilderExercise;