import React from "react";
import ScreenContainer from "../components/screen-container";
import PostsList from "../components/posts/posts-list";
const HomeScreen = () => {
  return (
    <ScreenContainer>
      <PostsList type="most_favorited"/>
    </ScreenContainer>
  );
};

export default HomeScreen;
