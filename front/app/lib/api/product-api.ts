import apiClient from "./api-client";

export interface Product {
  id: number;
  title: string;
  body: string;
}

export const getProducts = async () => {
  const response = await apiClient.get("api/v1/posts");
  return response.data;
};
