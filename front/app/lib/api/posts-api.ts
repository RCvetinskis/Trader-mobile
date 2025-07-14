import Toast from "react-native-toast-message";
import { generateAxiosErrorMessage } from "../../utils/general-helpers";
import apiClient from "./api-client";
import { IImage, PaginationMeta } from "../types";

export interface Post {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  user_id: number;
  images: IImage[];
  trade: boolean;
  is_favorited: boolean;
  price?: string;
}

export interface PostsResponse {
  posts: Post[];
  meta: PaginationMeta;
}

export const getPosts = async (
  page = 1,
  categoryId?: number,
  query?: string
): Promise<PostsResponse> => {
  const params = new URLSearchParams({ page: page.toString() });

  if (categoryId) params.append("category_id", categoryId.toString());

  if (query) {
    params.append("query", query);
  }

  const response = await apiClient.get(`api/v1/posts?${params}`);
  return response.data;
};

export const getCurrentUserPosts = async (page = 1): Promise<PostsResponse> => {
  const params = new URLSearchParams({ page: page.toString() });

  const response = await apiClient.get(
    `api/v1/posts/current_user_posts?${params}`
  );
  return response.data;
};

export const getMostFavoritedPosts = async (
  page = 1
): Promise<PostsResponse> => {
  const params = new URLSearchParams({ page: page.toString() });

  const response = await apiClient.get(
    `api/v1/posts/most_favorited_posts?${params}`
  );
  return response.data;
};

export const addFavoritePost = async (postId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/posts/${postId}/favorite`);
    return Toast.show({
      type: "success",
      text1: response.data.message,
    });
  } catch (error) {
    return Toast.show({
      type: "error",
      text1: "Failed to save post",
      text2: generateAxiosErrorMessage(error),
    });
  }
};

export const removeFavoritePost = async (postId: number) => {
  try {
    const response = await apiClient.delete(`/api/v1/posts/${postId}/favorite`);

    return Toast.show({
      type: "success",
      text1: response.data.message,
    });
  } catch (error) {
    return Toast.show({
      type: "error",
      text1: "Failed to remove post",
      text2: generateAxiosErrorMessage(error),
    });
  }
};

interface UploadPost {
  title: string;
  description: string;
  subcategory_id: number;
  images: any[];
  trade: boolean;
  price?: string;
}
export const uploadPost = async ({
  title,
  description,
  images,
  subcategory_id,
  trade,
  price,
}: UploadPost) => {
  const formData = new FormData();

  formData.append("post[title]", title);
  formData.append("post[description]", description);
  formData.append("post[category_id]", subcategory_id.toString());
  formData.append("post[trade]", trade ? "true" : "false");

  if (!trade && price) {
    formData.append("post[price]", price);
  }

  images.forEach((image) => {
    formData.append("post[images][]", {
      uri: image.uri,
      name: image.fileName || `image-${Date.now()}.jpg`,
      type: image.type || "image/jpeg",
    } as any);
  });
  try {
    const response = await apiClient.post("api/v1/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    Toast.show({
      type: "success",
      text1: "Succesfully created post",
    });
    return response.data;
  } catch (error) {
    return Toast.show({
      type: "error",
      text1: "Failed to create post",
      text2: generateAxiosErrorMessage(error),
    });
  }
};
