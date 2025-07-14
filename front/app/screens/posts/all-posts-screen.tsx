import React from "react";
import ScreenContainer from "../../components/screen-container";
import PostsList from "../../components/posts/posts-list";
import CategoriesNav from "../../components/categories-nav";
import { Divider } from "react-native-paper";
import SubCategoriesNav from "../../components/subcategories-nav";

const AllPostsScreen = () => {
  return (
    <ScreenContainer>
      <CategoriesNav />
      <Divider />
      <SubCategoriesNav />
      <PostsList type="default" />
    </ScreenContainer>
  );
};

export default AllPostsScreen;
