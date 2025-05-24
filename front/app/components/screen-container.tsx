import React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const ScreenContainer = ({ children, style }: Props) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
});
