import React from "react";
import { Text } from "react-native-paper";
import ScreenContainer from "../../components/screen-container";
import PostForm from "../../components/posts/post-form";

type Props = {};

const CreatePostScreen = (props: Props) => {
  return (
    <ScreenContainer>
      <Text  variant="titleLarge">
        Create Post
      </Text>

      <PostForm />
    </ScreenContainer>
  );
};

export default CreatePostScreen;
