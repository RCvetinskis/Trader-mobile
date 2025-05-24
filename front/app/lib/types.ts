export interface Product {
  id: number;
  title: string;
  body: string;
}
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Posts: undefined;
};

export type ImageType = { uri: string; name: string; type: string };
