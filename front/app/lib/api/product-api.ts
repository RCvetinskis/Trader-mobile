import { API_v1 } from "../constants";


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

  const resposne = await fetch(`${API_v1}/posts`, requestInfo);
  const posts = await resposne.json();

  return posts;
};
