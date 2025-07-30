import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

const Message = () => {
  const currentUserId = 2;
  const senderId = 1;
  const isReceiver = true;

  return (
    <View
      style={[
        styles.container,
        isReceiver ? styles.leftAligned : styles.rightAligned,
      ]}
    >
      {isReceiver && <Avatar.Text size={40} label="RC" />}
      <View
        style={[
          styles.textContainer,
          isReceiver ? styles.leftText : styles.rightText,
        ]}
      >
        <Text variant="titleSmall" numberOfLines={1} ellipsizeMode="tail">
          TESTASssssssssssssssssssss
        </Text>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 12,
    alignItems: "center",
  },
  leftAligned: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightAligned: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
  textContainer: {
    maxWidth: "80%",
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#f1f1f1",
  },
  leftText: {
    backgroundColor: "#e0e0e0",
    borderTopLeftRadius: 0,
  },
  rightText: {
    backgroundColor: "#cfe9ff",
    borderTopRightRadius: 0,
  },
});
