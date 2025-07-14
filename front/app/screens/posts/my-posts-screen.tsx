import React from "react";
import ScreenContainer from "../../components/screen-container";
import PostsList from "../../components/posts/posts-list";

const MyPostsScreen = () => {
  return (
    <ScreenContainer>
      <PostsList myPosts={true} />
    </ScreenContainer>
  );
};

export default MyPostsScreen;
