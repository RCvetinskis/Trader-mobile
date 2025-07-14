import React from "react";
import ScreenContainer from "../../components/screen-container";
import PostForm from "../../components/posts/post-form";

const CreatePostScreen = () => {
  return (
    <ScreenContainer style={{ padding: 16 }}>
      <PostForm />
    </ScreenContainer>
  );
};

export default CreatePostScreen;
