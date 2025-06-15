import React from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator, Chip, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import useCategories from "../hooks/useCategories";
import useCategoryNavigationStore from "../stores/category-navigation-store";

const CategoriesNav = () => {
  const { selectedCategory, selectedSubCategory, setSelectedSubCategory } =
    useCategoryNavigationStore();
  const { getSubCategoriesQuery } = useCategories();
  const subCategoriesQuery = getSubCategoriesQuery(selectedCategory?.id ?? 0);

  const subCategories = Array.isArray(subCategoriesQuery.data)
    ? subCategoriesQuery.data
    : [];

  const allCategory = { id: 0, name: "All", user_id: 0 };
  const categories = [allCategory, ...subCategories];
  const { colors } = useTheme();
  const styles = useStyles(colors);

  if (subCategoriesQuery.isLoading)
    return <ActivityIndicator animating={true} color={colors.primary} />;

  const isSelected = (categoryId: number) => {
    if (selectedSubCategory === null) return categoryId === 0;
    return categoryId === selectedSubCategory?.id;
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => {
        const selected = isSelected(category.id);
        return (
          <Chip
            onPress={() => setSelectedSubCategory(category)}
            key={category.id}
            style={selected ? styles.chipSelected : styles.chip}
          >
            {category.name}
          </Chip>
        );
      })}
    </ScrollView>
  );
};

export default CategoriesNav;

const useStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      padding: 12,
      maxHeight: 58,
    },
    scrollContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    chip: {
      borderRadius: 8,
      marginRight: 10,
      backgroundColor: colors.primary,
      height: 36,
    },
    chipSelected: {
      borderRadius: 8,
      marginRight: 10,
      backgroundColor: "transparent",
      borderColor: colors.primary,
      height: 32,
    },
  });
