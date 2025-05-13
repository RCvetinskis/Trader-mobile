import React, { useEffect, useState } from "react";
import { getProducts, Product } from "../api/product-api";
import { SafeAreaView, ScrollView, View } from "react-native";
import ProductPost from "../components/product-post";

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const posts = await getProducts();
      setProducts(posts);
    };
    fetchProducts();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
      <SafeAreaView>
        {products.map((product) => (
          <View key={product.id}>
            <ProductPost product={product} />
          </View>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
