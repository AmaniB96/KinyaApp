"use client";

import { useState } from "react";
import styles from "./MatchingExercise.module.css";

const shuffle = arr => arr.slice().sort(() => Math.random() - 0.5);

const MatchingExercise = ({ exercise, onComplete, progress }) => {
  const [left] = useState(exercise.pairs.map(p => p.left));
  const [right, setRight] = useState(shuffle(exercise.pairs.map(p => p.right)));
  const [matches, setMatches] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleLeftClick = (item) => setSelectedLeft(item);

  const handleRightClick = (item) => {
    if (selectedLeft && !Object.values(matches).includes(item)) {
      setMatches({ ...matches, [selectedLeft]: item });
      setSelectedLeft(null);
    }
  };

  const handleCheck = () => {
    setShowFeedback(true);
    const allCorrect = exercise.pairs.every(pair => matches[pair.left] === pair.right);
    if (allCorrect) setTimeout(onComplete, 1500);
  };

  return (
    <div className={`${styles.exerciseContainer} glass-effect`}>
      <div className={styles.progressIndicator}>{progress}</div>
      <h2 className={styles.exerciseTitle}>{exercise.instruction}</h2>
      <div className={styles.matchingGrid}>
        <div>
          {left.map(item => (
            <div
              key={item}
              className={`${styles.leftItem} ${selectedLeft === item ? styles.selected : ""}`}
              onClick={() => handleLeftClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
        <div>
          {right.map(item => (
            <div
              key={item}
              className={`${styles.rightItem} ${Object.values(matches).includes(item) ? styles.matched : ""}`}
              onClick={() => handleRightClick(item)}
            >
              {matches[selectedLeft] === item ? <b>{item}</b> : item}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.feedbackArea}>
        {showFeedback && (
          <div className={exercise.pairs.every(pair => matches[pair.left] === pair.right) ? styles.correct : styles.incorrect}>
            {exercise.pairs.every(pair => matches[pair.left] === pair.right) ? "Correct!" : "Try again!"}
          </div>
        )}
        {!showFeedback && (
          <button
            className={`btn btn-primary ${styles.checkBtn}`}
            onClick={handleCheck}
            disabled={Object.keys(matches).length !== left.length}
          >
            Check Answer
          </button>
        )}
        {showFeedback && !exercise.pairs.every(pair => matches[pair.left] === pair.right) && (
          <button
            className={`btn btn-secondary ${styles.retryBtn}`}
            onClick={() => {
              setShowFeedback(false);
              setMatches({});
              setSelectedLeft(null);
              setRight(shuffle(exercise.pairs.map(p => p.right)));
            }}
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default MatchingExercise;