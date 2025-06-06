import React from "react";
import { View } from "react-native";
import ProductPost from "../components/posts/product-post";
import { getPosts, Post } from "../lib/api/posts-api";
import { useQuery } from "@tanstack/react-query";
import ScreenContainer from "../components/screen-container";

const HomeScreen = () => {
  const {
    data: posts,
  } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <ScreenContainer>
      {posts &&
        posts.map((posts) => (
          <View key={posts.id}>
            <ProductPost product={posts} />
          </View>
        ))}
    </ScreenContainer>
  );
};

export default HomeScreen;
