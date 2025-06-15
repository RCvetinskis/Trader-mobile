import React from "react";
import { Card, Chip, IconButton, Text, useTheme } from "react-native-paper";
import { Post } from "../../lib/api/posts-api";
import noImage from "../../../assets/no_image.jpeg";
import { Image, StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
type Props = {
  product: Post;
};
const PostCard = ({ product }: Props) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const imageSource = product?.images?.[0]?.url
    ? { uri: product.images[0].url }
    : Image.resolveAssetSource(noImage);

  return (
    <Card style={styles.card}>
      <Card.Cover source={imageSource} style={styles.image} />
      <Card.Content style={styles.content}>
        <Text variant="titleMedium" style={styles.title}>
          {product.title}
        </Text>
        {product.price ? (
          <Chip icon="currency-usd" style={styles.chip}>{product.price}</Chip>
        ) : (
          <Chip style={styles.chip} icon="handshake">
            Trade
          </Chip>
        )}
      </Card.Content>
      <Card.Actions>
        <IconButton icon={"heart"} iconColor={colors.primary} size={20} />
      </Card.Actions>
    </Card>
  );
};

export default PostCard;

const useStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background,
      marginTop: 10,
      marginBottom: 20,
      flex: 1,
      padding: 0,
    },
    image: {
      height: 250,
    },
    content: {
      backgroundColor: "transparent",
    },
    title: {
      marginTop: 8,
      textTransform: "capitalize",
      color: colors.secondary,
    },
    chip: {
      marginTop: 4,
      borderRadius: 8,
      padding: 0,
      backgroundColor: colors.secondary,
    },
  });
