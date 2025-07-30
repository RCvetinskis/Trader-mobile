import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import useNav from "../../hooks/useNav";

const LastMessage = () => {
  const nav = useNav();
  const onPress = () => {
    nav.navigate("Conversation", { conversationId: 123 });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Avatar.Text size={40} label="RC" />

      <View style={styles.textContainer}>
        <Text variant="titleSmall">Robertas Cvetinskis</Text>

        <View style={styles.messageContainer}>
          <Text
            style={styles.truncatedText}
            variant="bodySmall"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Busy todasssss
          </Text>

          <Text variant="bodySmall">| Tuesday</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LastMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },

  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  messageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    color: "#666",
  },
  truncatedText: {
    overflow: "hidden",
  },
});
