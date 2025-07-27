"use client";

import { useState } from 'react';
import styles from './MultipleChoiceExercise.module.css';

const MultipleChoiceExercise = ({ exercise, onComplete, progress }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelectChoice = (choice) => {
    if (showFeedback) return;
    setSelectedChoice(choice);
  };

  const handleCheckAnswer = () => {
    if (!selectedChoice) return;

    const correct = selectedChoice.correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => {
        onComplete();
      }, 2000); // Wait 2 seconds before moving to the next exercise
    }
  };

  return (
    <div className={`${styles.exerciseContainer} glass-effect`}>
      <div className={styles.progressIndicator}>{progress}</div>
      <h2 className={styles.exerciseTitle}>{exercise.instruction}</h2>
      <p className={styles.questionText}>{exercise.question}</p>

      <div className={styles.choicesGrid}>
        {exercise.choices.map((choice, index) => (
          <button
            key={index}
            className={`
              ${styles.choiceButton} 
              ${selectedChoice === choice ? styles.selected : ''}
              ${showFeedback && choice.correct ? styles.correct : ''}
              ${showFeedback && !choice.correct && selectedChoice === choice ? styles.incorrect : ''}
            `}
            onClick={() => handleSelectChoice(choice)}
            disabled={showFeedback}
          >
            {choice.text}
          </button>
        ))}
      </div>

      <div className={styles.feedbackArea}>
        {showFeedback && (
          <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
            {isCorrect ? "Correct!" : "Not quite. Try again!"}
          </div>
        )}
        
        {!showFeedback && (
          <button 
            className={`btn btn-primary ${styles.checkBtn}`} 
            onClick={handleCheckAnswer}
            disabled={!selectedChoice}
          >
            Check Answer
          </button>
        )}
        {/* Retry button if incorrect */}
        {showFeedback && !isCorrect && (
          <button
            className={`btn btn-secondary ${styles.retryBtn}`}
            onClick={() => {
              setShowFeedback(false);
              setSelectedChoice(null);
              setIsCorrect(null);
            }}
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default MultipleChoiceExercise;