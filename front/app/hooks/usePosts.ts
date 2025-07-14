import {
  addFavoritePost,
  getCurrentUserPosts,
  getPosts,
  removeFavoritePost,
  PostsResponse,
  getMostFavoritedPosts,
} from "../lib/api/posts-api";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import useCategoryNavigationStore from "../stores/category-navigation-store";
import { AllPostsProp } from "../lib/types";

type Props = {
  type?: "default" | "my_posts" | "most_favorited";
};

const usePosts = ({ type = "default" }: Props) => {
  const route = useRoute<AllPostsProp>();
  const searchQuery = route.params?.search ?? "";

  const { selectedCategory, selectedSubCategory } =
    useCategoryNavigationStore();
  const queryClient = useQueryClient();

  const fetchPosts = async (pageParam: number) => {
    switch (type) {
      case "my_posts":
        return getCurrentUserPosts(pageParam);
      case "most_favorited":
        return getMostFavoritedPosts(pageParam);
      case "default":
      default:
        return getPosts(
          pageParam,
          selectedSubCategory?.id ?? selectedCategory?.id,
          searchQuery
        );
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<PostsResponse, Error>({
      queryKey: [
        "posts",
        type,
        selectedCategory?.id,
        selectedSubCategory?.id,
        searchQuery,
      ],
      queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam as number),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.meta.next_page ?? undefined,
    });

  const toggleFavorite = useMutation({
    mutationFn: async ({
      postId,
      isFavorited,
    }: {
      postId: number;
      isFavorited: boolean;
    }) => {
      return isFavorited
        ? await removeFavoritePost(postId)
        : await addFavoritePost(postId);
    },
    onSuccess: (_, variables) => {
      queryClient.setQueriesData({ queryKey: ["posts"] }, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((p: any) =>
              p.id === variables.postId
                ? { ...p, is_favorited: !p.is_favorited }
                : p
            ),
          })),
        };
      });
    },
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    toggleFavorite,
  };
};

export default usePosts;
