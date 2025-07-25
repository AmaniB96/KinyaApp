"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./DragDropExercise.module.css";

const DragDropExercise = ({ exercise, onComplete, progress }) => {
  const [words, setWords] = useState([]);
  const [slots, setSlots] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const constraintsRef = useRef(null);
  
  useEffect(() => {
    // Initialize words and slots from exercise
    if (exercise) {
      // Shuffle the words for the draggable items
      const shuffledWords = [...exercise.words].sort(() => Math.random() - 0.5);
      setWords(shuffledWords.map(word => ({ id: word.id, text: word.text, isPlaced: false })));
      setSlots(exercise.slots.map(slot => ({ id: slot.id, correctWordId: slot.correctWordId, currentWordId: null })));
    }
    
    setIsCorrect(null);
    setShowFeedback(false);
    setIsComplete(false);
  }, [exercise]);
  
  const handleDragEnd = (wordId, slotId) => {
    // Find the slot that was dropped on
    const slotIndex = slots.findIndex(slot => slot.id === slotId);
    
    if (slotIndex !== -1) {
      // If slot already has a word, return that word to the bank
      if (slots[slotIndex].currentWordId !== null) {
        setWords(words.map(word => 
          word.id === slots[slotIndex].currentWordId 
            ? { ...word, isPlaced: false } 
            : word
        ));
      }
      
      // Update slots with the new word
      const newSlots = [...slots];
      newSlots[slotIndex].currentWordId = wordId;
      setSlots(newSlots);
      
      // Mark the word as placed
      setWords(words.map(word => 
        word.id === wordId ? { ...word, isPlaced: true } : word
      ));
    }
  };
  
  const handleCheckAnswer = () => {
    // Check if all slots are filled correctly
    const allCorrect = slots.every(slot => slot.currentWordId === slot.correctWordId);
    setIsCorrect(allCorrect);
    setShowFeedback(true);
    
    if (allCorrect) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };
  
  const handleReset = () => {
    // Reset words and slots
    setWords(words.map(word => ({ ...word, isPlaced: false })));
    setSlots(slots.map(slot => ({ ...slot, currentWordId: null })));
    setShowFeedback(false);
    setIsCorrect(null);
  };

  const getWordById = (id) => {
    return words.find(word => word.id === id)?.text || "";
  };
  
  return (
    <div className={`${styles.exerciseContainer} glass-effect`}>
      <div className={styles.progressIndicator}>{progress}</div>
      
      <h2 className={styles.exerciseTitle}>{exercise.instruction}</h2>
      <p className={styles.exerciseDescription}>{exercise.description}</p>
      
      {/* Drop Zone */}
      <div className={styles.sentenceArea} ref={constraintsRef}>
        <div className={styles.sentenceContainer}>
          {exercise.sentenceStart && <span className={styles.sentencePart}>{exercise.sentenceStart}</span>}
          
          {slots.map((slot, index) => (
            <div 
              key={slot.id}
              className={`${styles.dropSlot} ${showFeedback ? (slot.currentWordId === slot.correctWordId ? styles.correct : styles.incorrect) : ''}`}
              data-slot-id={slot.id}
            >
              {slot.currentWordId !== null ? (
                <div className={styles.placedWord}>
                  {getWordById(slot.currentWordId)}
                </div>
              ) : null}
            </div>
          ))}
          
          {exercise.sentenceEnd && <span className={styles.sentencePart}>{exercise.sentenceEnd}</span>}
        </div>
      </div>
      
      {/* Word Bank */}
      <div className={styles.wordBank}>
        {words.map(word => !word.isPlaced && (
          <motion.div
            key={word.id}
            className={styles.draggableWord}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              // Find which slot was closest to the drop position
              const elements = document.querySelectorAll(`.${styles.dropSlot}`);
              let closestSlot = null;
              let closestDistance = Infinity;
              
              elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(
                  Math.pow(info.point.x - centerX, 2) + 
                  Math.pow(info.point.y - centerY, 2)
                );
                
                if (distance < closestDistance) {
                  closestDistance = distance;
                  closestSlot = element.dataset.slotId;
                }
              });
              
              // Only register if the word is dropped close enough to a slot
              if (closestDistance < 100) {
                handleDragEnd(word.id, closestSlot);
              }
            }}
          >
            {word.text}
          </motion.div>
        ))}
      </div>
      
      {/* Feedback Area */}
      <div className={styles.feedbackArea}>
        {showFeedback && (
          <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
            {isCorrect 
              ? "Excellent! You got it right!" 
              : "Not quite right. Try again!"
            }
          </div>
        )}
        
        <div className={styles.buttonGroup}>
          {!isComplete && (
            <>
              <button 
                className={`btn btn-secondary ${styles.resetBtn}`} 
                onClick={handleReset}
              >
                Reset
              </button>
              <button 
                className={`btn btn-primary ${styles.checkBtn}`} 
                onClick={handleCheckAnswer}
                disabled={slots.some(slot => slot.currentWordId === null)}
              >
                Check Answer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragDropExercise;