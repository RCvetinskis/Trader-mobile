import Toast from "react-native-toast-message";
import { generateAxiosErrorMessage } from "../../utils/general-helpers";
import apiClient from "./api-client";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const getPosts = async () => {
  const response = await apiClient.get("api/v1/posts");
  return response.data;
};

interface UploadPost {
  title: string;
  description: string;
  subcategory_id: number
  images: any[];
}
export const uploadPost = async ({
  title,
  description,
  images,
  subcategory_id
}: UploadPost) => {
  const formData = new FormData();

  formData.append("post[title]", title);
  formData.append("post[description]", description);
  formData.append("post[category_id]", subcategory_id.toString());

  images.forEach((image) => {
    formData.append("post[images][]", {
      uri: image.uri,
      name: image.fileName || `image-${Date.now()}.jpg`,
      type: image.type || "image/jpeg",
    } as any);
  });
  try {
    await apiClient.post("api/v1/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return Toast.show({
      type: "success",
      text1: "Succesfully created post",
    });
  } catch (error) {
    return Toast.show({
      type: "error",
      text1: "Failed to create post",
      text2: generateAxiosErrorMessage(error),
    });
  }
};
