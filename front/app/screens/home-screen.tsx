import React from "react";
import ScreenContainer from "../components/screen-container";
import PostsList from "../components/posts/posts-list";
import CategoriesNav from "../components/categories-nav";
import SubcategoriesNav from "../components/subcategories-nav";
import { Divider } from "react-native-paper";

const HomeScreen = () => {
  return (
    <ScreenContainer>
      <CategoriesNav />
      <Divider />
      <SubcategoriesNav />
      <PostsList />
    </ScreenContainer>
  );
};

export default HomeScreen;
