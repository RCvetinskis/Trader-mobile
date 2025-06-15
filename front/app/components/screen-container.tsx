import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const ScreenContainer = ({ children, style }: Props) => {
  return (
    <SafeAreaView edges={["bottom"]} style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 4,
  },
});
