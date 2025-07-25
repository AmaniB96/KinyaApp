"use client";

import styles from './DifficultyTag.module.css';

const DifficultyTag = ({ difficulty }) => {
  const getColor = () => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'var(--color-primary)';
      case 'intermediate':
        return 'var(--color-secondary)';
      case 'advanced':
        return '#e74c3c';
      default:
        return 'var(--color-text-muted)';
    }
  };

  return (
    <span
      className={styles.difficultyTag}
      style={{ backgroundColor: `${getColor()}33`, color: getColor() }}
    >
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  );
};

export default DifficultyTag;