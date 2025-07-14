import React from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";

import PostCard from "./post-card";
import NoDataFound from "../no-data-found";
import usePosts from "../../hooks/usePosts";

const windowWidth = Dimensions.get("window").width;

const PostsList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePosts();

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
