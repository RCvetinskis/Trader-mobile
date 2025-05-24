import React from "react";
import { View } from "react-native";
import ProductPost from "../components/posts/product-post";
import { getProducts, Product } from "../lib/api/product-api";
import { useQuery } from "@tanstack/react-query";
import ScreenContainer from "../components/screen-container";

const HomeScreen = () => {
  const {
    data: products,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <ScreenContainer>
      {products &&
        products.map((product) => (
          <View key={product.id}>
            <ProductPost product={product} />
          </View>
        ))}
    </ScreenContainer>
  );
};

export default HomeScreen;
