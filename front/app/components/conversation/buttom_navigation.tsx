import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme/theme";
import { MobileScreenTypes } from "../../lib/types";

type Props = {
  setScreen: (screen: MobileScreenTypes) => void;
};

const ButtomNavigation = ({ setScreen }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        icon="chat"
        size={28}
        iconColor={theme.colors.primary}
        onPress={() => setScreen("chat")}
      />

      <IconButton
        icon="cog"
        size={28}
        iconColor={theme.colors.primary}
        onPress={() => setScreen("settings")}
      />
    </SafeAreaView>
  );
};

export default ButtomNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 100,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
});
