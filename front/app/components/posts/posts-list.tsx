import React from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts, PostsResponse } from "../../lib/api/posts-api";
import PostCard from "./post-card";
import useCategoryNavigationStore from "../../stores/category-navigation-store";
import NoDataFound from "../no-data-found";

const windowWidth = Dimensions.get("window").width;
// TODO: search, create category, display  my posts, favorites
const PostsList = () => {
  const { selectedCategory, selectedSubCategory } =
    useCategoryNavigationStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<PostsResponse, Error>({
      queryKey: ["posts", selectedCategory?.id, selectedSubCategory?.id],
      queryFn: async ({ pageParam = 1 }) =>
        getPosts(
          pageParam as number,
          selectedSubCategory?.id ?? selectedCategory?.id
        ),

      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.meta.next_page ?? undefined;
      },
    });

  if (isLoading) return <ActivityIndicator animating={true} />;

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (!posts.length)
    return (
      <NoDataFound description=" Try selecting a different category or come back later." />
    );
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.itemContainer} key={item.id}>
          <PostCard product={item} />
        </View>
      )}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? <ActivityIndicator size="large" /> : null
      }
    />
  );
};

export default PostsList;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 5,
    maxWidth: windowWidth / 2 - 15,
  },
});
