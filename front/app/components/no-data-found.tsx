import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
type Props = {
  description: string;
};

const NoDataFound = ({ description }: Props) => {
  return (
    <View style={styles.noPostsContainer}>
      <MaterialCommunityIcons
        name="folder-open-outline"
        size={64}
        color="#999"
      />
      <Text style={styles.noPostsText}>No data found</Text>
      <Text style={styles.noPostsSubText}>{description}</Text>
    </View>
  );
};

export default NoDataFound;

const styles = StyleSheet.create({
  noPostsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  noPostsText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    color: "#444",
  },
  noPostsSubText: {
    fontSize: 16,
    marginTop: 8,
    color: "#666",
    textAlign: "center",
    maxWidth: 280,
  },
});
