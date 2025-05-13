import React from "react";
import { Product } from "../api/product-api";
import { Button, Card, Text } from "react-native-paper";
type Props = {
  product: Product;
};
const ProductPost = ({ product }: Props) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={product.title} />
      <Card.Content>
        <Text variant="bodyMedium">{product.body}</Text>
      </Card.Content>
      <Card.Cover source={{uri:'https://picsum.photos/700'}}/>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = {
  card: {
    marginTop: 10,
    marginBottom: 50,
  },
};
export default ProductPost;
