"use client";

import { useState } from "react";
import DifficultyTag from "./DifficultyTag";
import ProgressBar from "./ProgressBar";
import LessonCard from "./LessonCard";
import useLessonStore from "../store/useLessonStore";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ category }) => {
  const [expanded, setExpanded] = useState(false);
  const lessonStore = useLessonStore();
  
  // Calculate overall progress
  const calculateProgress = () => {
    if (!category.lessons.length) return 0;
    
    const lessonProgress = category.lessons.map(lesson => 
      lessonStore.getProgress(lesson.id).progress || 0
    );
    
    const totalProgress = lessonProgress.reduce((sum, progress) => sum + progress, 0);
    return totalProgress / category.lessons.length;
  };

  return (
    <div className={`${styles.categoryCard} glass-effect ${expanded ? styles.expanded : ''}`}>
      <div 
        className={styles.categoryHeader}
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h3 className={`${styles.categoryTitle} gradient-text`}>{category.title}</h3>
          <p className={styles.categoryDescription}>{category.description}</p>
          
          <div className={styles.categoryMeta}>
            <DifficultyTag difficulty={category.difficulty} />
            <span className={styles.lessonCount}>{category.lessons.length} lessons</span>
          </div>
        </div>
        <ProgressBar progress={calculateProgress()} />
      </div>
      
      {expanded && (
        <div className={styles.lessonsContainer}>
          <div className={styles.lessonsScroll}>
            {category.lessons.map(lesson => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                categoryLessons={category.lessons}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;