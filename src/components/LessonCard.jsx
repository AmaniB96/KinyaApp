"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DifficultyTag from "./DifficultyTag";
import ProgressBar from "./ProgressBar";
import useLessonStore from "../store/useLessonStore";
import { FaLock, FaUnlock, FaClock } from "react-icons/fa";
import styles from "./LessonCard.module.css";

const LessonCard = ({ lesson, categoryLessons }) => {
  const router = useRouter();
  const { getProgress, isLessonUnlocked } = useLessonStore();
  const [isHovering, setIsHovering] = useState(false);
  
  const { progress, completed } = getProgress(lesson.id);
  const isUnlocked = isLessonUnlocked(lesson, categoryLessons);
  
  const handleLessonClick = () => {
    if (isUnlocked) {
      router.push(`/lessons/${lesson.id}`);
    }
  };

  return (
    <div 
      className={`${styles.lessonCard} glass-effect ${!isUnlocked ? styles.locked : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleLessonClick}
    >
      <div className={styles.lessonContent}>
        <h4 className={styles.lessonTitle}>{lesson.title}</h4>
        <p className={styles.lessonDescription}>{lesson.description}</p>
        
        <div className={styles.lessonMeta}>
          <DifficultyTag difficulty={lesson.difficulty} />
          <span className={styles.lessonExercises}>
            {lesson.exercises} exercises
          </span>
          <span className={styles.lessonTime}>
            <FaClock /> {lesson.estimatedMinutes} min
          </span>
        </div>
        
        {progress > 0 && (
          <div className={styles.lessonProgress}>
            <ProgressBar progress={progress} />
            <span className={styles.progressText}>
              {completed ? 'Completed' : `${Math.round(progress * 100)}% complete`}
            </span>
          </div>
        )}
      </div>
      
      {!isUnlocked && (
        <div className={styles.lessonLock}>
          <FaLock />
        </div>
      )}
      
      {isUnlocked && isHovering && (
        <div className={styles.lessonUnlockIndicator}>
          <FaUnlock />
        </div>
      )}
    </div>
  );
};

export default LessonCard;