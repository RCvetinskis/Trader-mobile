import { API_URL } from "@env";


export interface Product {
  id: number;
  title: string;
  body: string;
}

export const getProducts = async () => {
  const requestInfo = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const resposne = await fetch(`${API_URL}/posts`, requestInfo);
  const posts = await resposne.json();

  return posts;
};
