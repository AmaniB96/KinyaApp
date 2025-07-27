"use client";

import { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import CategoryCard from "../../components/CategoryCard";
import useCategoryStore from "../../store/useCategoryStore";
import styles from "./lessons.module.css";

export default function LessonsPage() {
  const { categories, isLoading, initCategories } = useCategoryStore();

  useEffect(() => {
    initCategories();
  }, [initCategories]);

  return (
    <MainLayout activePage="lessons">
      <div className={styles.lessonsPage}>
        <div className={styles.lessonsHeader}>
          <h1>Kinyarwanda Lessons</h1>
          <p className={styles.lessonsSubtitle}>
            Select a category below to begin your learning journey
          </p>
        </div>
        
        {isLoading ? (
          <div className={styles.loadingIndicator}>Loading lessons...</div>
        ) : (
          <div className={styles.categoriesGrid}>
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}