import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLessonStore = create(
  persist(
    (set, get) => ({
      lessonProgress: {}, // { lessonId: { progress: 0.5, completed: false } }
      
      // Update lesson progress
      updateProgress: (lessonId, progress, completed = false) => set(state => ({
        lessonProgress: {
          ...state.lessonProgress,
          [lessonId]: { progress, completed }
        }
      })),
      
      // Get lesson progress
      getProgress: (lessonId) => {
        const progress = get().lessonProgress[lessonId];
        return progress || { progress: 0, completed: false };
      },
      
      // Check if a lesson is unlocked
      isLessonUnlocked: (lesson, allLessons) => {
        if (lesson.prerequisites?.length) {
          return lesson.prerequisites.every(
            preId => get().lessonProgress[preId]?.completed
          );
        }
        return true; // No prerequisites = unlocked
      },
    }),
    {
      name: "kinya-lesson-progress", // localStorage key
    }
  )
);

export default useLessonStore;