"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "../../../components/MainLayout";
import LessonIntro from "../../../components/lessons/LessonIntro";
import DragDropExercise from "../../../components/lessons/DragDropExercise";
import MultipleChoiceExercise from "../../../components/lessonGames/MultipleChoiceExercise";
import FillGapExercise from "../../../components/lessonGames/FillGapExercise";
import MatchingExercise from "../../../components/lessonGames/MatchingExercise";
import SentenceBuilderExercise from "../../../components/lessonGames/SentenceBuilderExercise";
import TypingExercise from "../../../components/lessonGames/TypingExercise";
import LessonComplete from "../../../components/lessons/LessonComplete";
import useLessonStore from "../../../store/useLessonStore";
// Import categoriesData to find which file to load
import categoriesData from "../../../data/categories.json";
import styles from "./lesson.module.css";

export default function LessonPage({ params }) {
  const { lessonId } = params;
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState("intro");
  const [currentExercise, setCurrentExercise] = useState(0);
  const { updateProgress } = useLessonStore();
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLessonData = async () => {
      setIsLoading(true);

      // 1. Find which category this lesson belongs to
      const category = categoriesData.find(cat => 
        cat.lessons.some(l => l.id === lessonId)
      );

      if (!category) {
        console.error("Lesson category not found, redirecting.");
        router.push("/lessons");
        return;
      }

      try {
        // 2. Dynamically import the correct JSON file for that category
        const lessonModule = await import(`../../../data/lessons/${category.id}.json`);
        const lessonContent = lessonModule.default;

        // 3. Find the specific lesson within the loaded data
        const foundLesson = lessonContent.find(l => l.id === lessonId);

        if (foundLesson) {
          setLesson(foundLesson);
        } else {
          console.error("Lesson content not found in file, redirecting.");
          router.push("/lessons");
        }
      } catch (error) {
        console.error("Failed to load lesson data:", error);
        router.push("/lessons");
      } finally {
        setIsLoading(false);
      }
    };

    loadLessonData();
  }, [lessonId, router]);

  if (isLoading || !lesson) {
    return (
      <MainLayout activePage="lessons">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingIndicator}>Loading lesson...</div>
        </div>
      </MainLayout>
    );
  }

  const handleIntroComplete = () => {
    setCurrentStage("exercise");
  };

  const handleExerciseComplete = () => {
    if (currentExercise < lesson.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    } else {
      setCurrentStage("complete");
      updateProgress(lessonId, 1, true);
    }
  };

  const handleFinishLesson = () => {
    router.push("/lessons");
  };

  const renderExercise = () => {
    const exercise = lesson.exercises[currentExercise];
    const progress = `${currentExercise + 1}/${lesson.exercises.length}`;

    switch (exercise.type) {
      case "dragDrop":
        return (
          <DragDropExercise
            exercise={exercise}
            onComplete={handleExerciseComplete}
            progress={progress}
          />
        );
      case "multiple-choice":
        return (
          <MultipleChoiceExercise
            exercise={exercise}
            onComplete={handleExerciseComplete}
            progress={progress}
          />
        );
      case "fill-gap":
        return (
          <FillGapExercise
            exercise={exercise}
            onComplete={handleExerciseComplete}
            progress={progress}
          />
        );
      case "matching":
        return (
          <MatchingExercise
            exercise={exercise}
            onComplete={handleExerciseComplete}
            progress={progress}
          />
        );
      case "sentence-builder":
        return (
          <SentenceBuilderExercise
            exercise={exercise}
            onComplete={handleExerciseComplete}
            progress={progress}
          />
        );
      case "typing":
        return (
          <TypingExercise
            exercise={exercise}
            onComplete={handleExerciseComplete}
            progress={progress}
          />
        );
      default:
        console.warn(`Unknown exercise type: ${exercise.type}`);
        return <div>Unsupported exercise type.</div>;
    }
  };

  const renderContent = () => {
    switch (currentStage) {
      case "intro":
        return (
          <LessonIntro
            title={lesson.title}
            theory={lesson.theory}
            onContinue={handleIntroComplete}
          />
        );
      case "exercise":
        return renderExercise();
      case "complete":
        return (
          <LessonComplete
            lessonTitle={lesson.title}
            onFinish={handleFinishLesson}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout activePage="lessons">
      <div className={styles.lessonContainer}>
        {renderContent()}
      </div>
    </MainLayout>
  );
}