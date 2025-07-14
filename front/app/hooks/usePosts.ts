import useCategoryNavigationStore from "../stores/category-navigation-store";
import { getPosts, PostsResponse } from "../lib/api/posts-api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import { AllPostsProp } from "../lib/types";
type Props = {
  myPosts?: boolean;
};
const usePosts = ({ myPosts }: Props) => {
  const route = useRoute<AllPostsProp>();
  const searchQuery = route.params?.search ?? "";

  const { selectedCategory, selectedSubCategory } =
    useCategoryNavigationStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<PostsResponse, Error>({
      queryKey: [
        "posts",
        selectedCategory?.id,
        selectedSubCategory?.id,
        searchQuery,
      ],
      queryFn: async ({ pageParam = 1 }) =>
        getPosts(
          pageParam as number,
          myPosts,
          selectedSubCategory?.id ?? selectedCategory?.id,
          searchQuery
        ),

      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.meta.next_page ?? undefined;
      },
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};

export default usePosts;
