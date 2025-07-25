"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "../../../components/MainLayout";
import LessonIntro from "../../../components/lessons/LessonIntro";
import DragDropExercise from "../../../components/lessons/DragDropExercise";
import LessonComplete from "../../../components/lessons/LessonComplete";
import useLessonStore from "../../../store/useLessonStore";
import lessonData from "../../../data/lessonContent.json";
import styles from "./lesson.module.css";

export default function LessonPage({ params }) {
  const { lessonId } = params;
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState("intro"); // intro, exercise, complete
  const [currentExercise, setCurrentExercise] = useState(0);
  const { updateProgress, getProgress } = useLessonStore();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    // Fetch the specific lesson data
    const foundLesson = lessonData.find(l => l.id === lessonId);
    if (foundLesson) {
      setLesson(foundLesson);
    } else {
      // Lesson not found, redirect to lessons page
      router.push("/lessons");
    }
  }, [lessonId, router]);

  if (!lesson) {
    return (
      <MainLayout activePage="lessons">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingIndicator}>Loading lesson content...</div>
        </div>
      </MainLayout>
    );
  }

  const handleIntroComplete = () => {
    setCurrentStage("exercise");
  };

  const handleExerciseComplete = () => {
    if (currentExercise < lesson.exercises.length - 1) {
      // Move to next exercise
      setCurrentExercise(prev => prev + 1);
    } else {
      // Complete the lesson
      setCurrentStage("complete");
      updateProgress(lessonId, 1, true); // 100% complete
    }
  };

  const handleFinishLesson = () => {
    router.push("/lessons");
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
        return (
          <DragDropExercise
            exercise={lesson.exercises[currentExercise]}
            onComplete={handleExerciseComplete}
            progress={`${currentExercise + 1}/${lesson.exercises.length}`}
          />
        );
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