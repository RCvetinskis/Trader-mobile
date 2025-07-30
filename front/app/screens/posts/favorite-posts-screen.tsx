import React from "react";
import ScreenContainer from "../../components/screen-container";
import PostsList from "../../components/posts/posts-list";

const FavoritePostsScreen = () => {
  return (
    <ScreenContainer>
      <PostsList type="user_favorites" />
    </ScreenContainer>
  );
};

export default FavoritePostsScreen;
