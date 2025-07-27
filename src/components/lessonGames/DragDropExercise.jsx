"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import styles from "./DragDropExercise.module.css";

const DragDropExercise = ({ exercise, onComplete, progress }) => {
  // exercise.words: [{ id, text }]
  // exercise.slots: [{ id, correctWordId }]
  // exercise.sentenceStart, exercise.sentenceEnd

  const [slotWords, setSlotWords] = useState(
    exercise.slots.map(() => null)
  );
  const [bankWords, setBankWords] = useState(exercise.words);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Drag from bank to slot
    if (source.droppableId === "bank" && destination.droppableId.startsWith("slot-")) {
      const word = bankWords[source.index];
      const slotIdx = parseInt(destination.droppableId.replace("slot-", ""));
      if (slotWords[slotIdx]) return; // slot already filled

      const newBank = [...bankWords];
      newBank.splice(source.index, 1);
      const newSlots = [...slotWords];
      newSlots[slotIdx] = word;
      setBankWords(newBank);
      setSlotWords(newSlots);
    }
    // Drag from slot back to bank
    else if (source.droppableId.startsWith("slot-") && destination.droppableId === "bank") {
      const slotIdx = parseInt(source.droppableId.replace("slot-", ""));
      const word = slotWords[slotIdx];
      if (!word) return;

      const newSlots = [...slotWords];
      newSlots[slotIdx] = null;
      const newBank = [...bankWords];
      newBank.splice(destination.index, 0, word);
      setBankWords(newBank);
      setSlotWords(newSlots);
    }
  };

  const handleCheck = () => {
    const correct = slotWords.every(
      (word, idx) => word && word.id === exercise.slots[idx].correctWordId
    );
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) setTimeout(onComplete, 1500);
  };

  const handleRetry = () => {
    setBankWords(exercise.words);
    setSlotWords(exercise.slots.map(() => null));
    setShowFeedback(false);
    setIsCorrect(false);
  };

  return (
    <div className={`${styles.exerciseContainer} glass-effect`}>
      <div className={styles.progressIndicator}>{progress}</div>
      <h2 className={styles.exerciseTitle}>{exercise.instruction}</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.sentence}>
          {exercise.sentenceStart}
          {exercise.slots.map((slot, idx) => (
            <Droppable key={slot.id} droppableId={`slot-${idx}`}>
              {(provided, snapshot) => (
                <span
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={styles.dropSlot}
                >
                  {slotWords[idx] ? (
                    <Draggable draggableId={slotWords[idx].id} index={0}>
                      {(provided, snapshot) => (
                        <span
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={styles.word}
                        >
                          {slotWords[idx].text}
                        </span>
                      )}
                    </Draggable>
                  ) : (
                    <span className={styles.emptySlot}>[ Drop here ]</span>
                  )}
                  {provided.placeholder}
                </span>
              )}
            </Droppable>
          ))}
          {exercise.sentenceEnd}
        </div>
        <Droppable droppableId="bank" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.wordBank}
            >
              {bankWords.map((word, idx) => (
                <Draggable key={word.id} draggableId={word.id} index={idx}>
                  {(provided, snapshot) => (
                    <span
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.word}
                    >
                      {word.text}
                    </span>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className={styles.feedbackArea}>
        {showFeedback && (
          <div className={isCorrect ? styles.correct : styles.incorrect}>
            {isCorrect ? "Correct!" : "Try again!"}
          </div>
        )}
        {!showFeedback && (
          <button
            className={`btn btn-primary ${styles.checkBtn}`}
            onClick={handleCheck}
            disabled={slotWords.some(w => !w)}
          >
            Check Answer
          </button>
        )}
        {showFeedback && !isCorrect && (
          <button
            className={`btn btn-secondary ${styles.retryBtn}`}
            onClick={handleRetry}
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default DragDropExercise;