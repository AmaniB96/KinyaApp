"use client";

import { useState, useEffect } from 'react';

const AnimatedTitle = () => {
  const words = ["Learn Kinyarwanda", "Karibu", "Welcome"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);

  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    const targetWord = words[currentWordIndex];
    let iterations = 0;
    const maxIterations = targetWord.length;

    setIsScrambling(true);

    const interval = setInterval(() => {
      setDisplayText(() => {
        return targetWord
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return char;
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("");
      });

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
        
        // Wait 2 seconds before moving to next word
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }

      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [currentWordIndex]);

  return (
    <h1 className="hero-title gradient-text animated-title">
      {displayText}
    </h1>
  );
};

export default AnimatedTitle;