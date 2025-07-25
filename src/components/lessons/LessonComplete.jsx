"use client";

import { useState, useEffect } from "react";
import { FaTrophy, FaArrowRight } from "react-icons/fa";
import styles from "./LessonComplete.module.css";

const LessonComplete = ({ lessonTitle, onFinish }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Show confetti effect after a small delay
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.completeContainer} glass-effect`}>
      {showConfetti && (
        <div className={styles.confetti}>
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className={styles.confettiPiece}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              }}
            ></div>
          ))}
        </div>
      )}
      
      <div className={styles.trophyIcon}>
        <FaTrophy />
      </div>
      
      <h2 className={styles.completeTitle}>Lesson Complete!</h2>
      <p className={styles.completeSubtitle}>
        You've successfully completed the "{lessonTitle}" lesson.
      </p>
      
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>100%</span>
          <span className={styles.statLabel}>Accuracy</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>✓</span>
          <span className={styles.statLabel}>Lesson Mastered</span>
        </div>
      </div>
      
      <button className={`btn btn-primary ${styles.continueBtn}`} onClick={onFinish}>
        Continue <FaArrowRight className={styles.btnIcon} />
      </button>
    </div>
  );
};

export default LessonComplete;