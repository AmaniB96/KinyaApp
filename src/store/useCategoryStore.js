import { create } from "zustand";
import categoriesData from "../data/categories.json";

const useCategoryStore = create((set) => ({
  categories: [],
  selectedCategory: null,
  isLoading: true,
  
  // Initialize categories
  initCategories: () => set({ 
    categories: categoriesData,
    isLoading: false 
  }),
  
  // Select a category
  selectCategory: (categoryId) => set(state => ({
    selectedCategory: state.categories.find(cat => cat.id === categoryId)
  })),
  
  // Clear selection
  clearSelection: () => set({ selectedCategory: null }),
}));

export default useCategoryStore;