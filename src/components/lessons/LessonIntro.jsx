"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './LessonIntro.module.css';

const LessonIntro = ({ title, theory, onContinue }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const handleContinue = () => {
    setFadeOut(true);
    setTimeout(onContinue, 500);
  };

  return (
    <div className={`${styles.introContainer} ${fadeOut ? styles.fadeOut : ''} glass-effect`}>
      <h1 className={`${styles.lessonTitle} gradient-text`}>{title}</h1>
      
      <div className={styles.theoryContent}>
        {theory.map((section, index) => (
          <div key={index} className={styles.theorySection}>
            {section.heading && <h2 className={styles.sectionHeading}>{section.heading}</h2>}
            
            {section.paragraphs.map((para, i) => (
              <p key={i} className={styles.paragraph}>{para}</p>
            ))}
            
            {section.examples && (
              <div className={styles.examples}>
                {section.examples.map((example, j) => (
                  <div key={j} className={styles.example}>
                    <p className={styles.kinyarwanda}>{example.kinyarwanda}</p>
                    <p className={styles.pronunciation}>{example.pronunciation}</p>
                    <p className={styles.english}>{example.english}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button className={`btn btn-primary ${styles.continueBtn}`} onClick={handleContinue}>
        Start Exercises
      </button>
    </div>
  );
};

export default LessonIntro;