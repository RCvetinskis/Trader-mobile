import { create } from "zustand";
import { Category } from "../lib/api/category-api";

interface CategoryNavigationState {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category) => void;
  selectedSubCategory: Category | null;
  setSelectedSubCategory: (category: Category) => void;
}
const useCategoryNavigationStore = create<CategoryNavigationState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) =>
    set({ selectedCategory: category, selectedSubCategory: null }),
  selectedSubCategory: null,
  setSelectedSubCategory: (category) => set({ selectedSubCategory: category }),
}));

export default useCategoryNavigationStore;
