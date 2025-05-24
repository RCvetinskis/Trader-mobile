import apiClient from "./api-client";

export interface Category {
  id: number;
  name: string;
  user_id: number;
  parent_id?: number;
}

export const getCategories = async () => {
  const response = await apiClient.get("api/v1/categories");

  return response.data;
};
