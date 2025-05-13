import React from "react";
import { Product } from "../api/product-api";
import { Button, Card, Text } from "react-native-paper";
import { productPostStyles } from "../styles/products/product-post.styles";
type Props = {
  product: Product;
};
const ProductPost = ({ product }: Props) => {
  return (
    <Card style={productPostStyles.card}>
      <Card.Title title={product.title} />
      <Card.Content>
        <Text variant="bodyMedium">{product.body}</Text>
      </Card.Content>
      <Card.Cover
        source={{ uri: "https://picsum.photos/700" }}
        style={productPostStyles.image}
      />
      <Card.Actions>
        <Button>Buy</Button>
      </Card.Actions>
    </Card>
  );
};

export default ProductPost;
