import React from "react";
import { View, StyleSheet } from "react-native";
import { Drawer, Text, TouchableRipple, useTheme } from "react-native-paper";

const SideBar = () => {
  const [active, setActive] = React.useState("home");
  const theme = useTheme();

  const menuItems = [
    { label: "Home", icon: "home", key: "home" },
    { label: "Profile", icon: "account", key: "profile" },
    { label: "Settings", icon: "cog", key: "settings" },
    { label: "Logout", icon: "logout", key: "logout" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Drawer.Section title="Main Menu">
        {menuItems.map((item) => (
          <Drawer.Item
            key={item.key}
            label={item.label}
            icon={item.icon}
            active={active === item.key}
            onPress={() => setActive(item.key)}
            rippleColor={theme.colors.primaryContainer}
          />
        ))}
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});

export default SideBar;
