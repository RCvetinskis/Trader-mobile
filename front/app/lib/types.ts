import { RouteProp } from "@react-navigation/native";

export interface IImage {
  id: number;
  filename: string;
  content_type: string;
  url: string;
}

export type PaginationMeta = {
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
  total_pages: number;
  total_count: number;
};
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Posts: undefined;
  "All Posts": undefined | { search?: string };
};

export type ImageType = { uri: string; name: string; type: string };

export type AllPostsProp = RouteProp<RootStackParamList, "All Posts">;
