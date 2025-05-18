import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import ProductPost from "../components/product-post";
import { getProducts, Product } from "../lib/api/product-api";
import { useQuery } from "@tanstack/react-query";

const HomeScreen = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
      <SafeAreaView>
        {products &&
          products.map((product) => (
            <View key={product.id}>
              <ProductPost product={product} />
            </View>
          ))}
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
