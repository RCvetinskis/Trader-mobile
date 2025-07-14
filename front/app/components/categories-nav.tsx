import React from "react";
import { ScrollView } from "react-native";
import useCategories from "../hooks/useCategories";
import { ActivityIndicator, Chip, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import useCategoryNavigationStore from "../stores/category-navigation-store";
import { View } from "react-native";

const CategoriesNav = () => {
  const { selectedCategory, setSelectedCategory } =
    useCategoryNavigationStore();
  const { topLevelCategories, isTopLevelLoading } = useCategories();
  const allCategory = { id: 0, name: "All", user_id: 0 };
  const categories = [allCategory, ...topLevelCategories];

  const { colors } = useTheme();
  const styles = useStyles(colors);

  if (isTopLevelLoading)
    return <ActivityIndicator animating={true} color={colors.primary} />;

  const isSelected = (categoryId: number) => {
    if (selectedCategory === null) return categoryId === 0;
    return categoryId === selectedCategory?.id;
  };

  return (
    <View>
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
              onPress={() => setSelectedCategory(category)}
              key={category.id}
              style={selected ? styles.chipSelected : styles.chip}
            >
              {category.name}
            </Chip>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoriesNav;

const useStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      padding: 12,
      maxHeight: 48,
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
