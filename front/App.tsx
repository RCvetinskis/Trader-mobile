import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { PaperProvider, Text, Drawer, Button } from "react-native-paper";
import HomeScreen from "./app/screens/home-screen";

export default function App() {
  // TODO: move drawer to sidebar component
  const [active, setActive] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { label: "Home", icon: "home", key: "home" },
    { label: "Profile", icon: "account", key: "profile" },
    { label: "Settings", icon: "cog", key: "settings" },
    { label: "Logout", icon: "logout", key: "logout" },
  ];

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        {/* Sidebar/Drawer */}
        <View style={[styles.drawer, { left: drawerOpen ? 0 : -300 }]}>
          <Drawer.Section title="Main Menu">
            {menuItems.map((item) => (
              <Drawer.Item
                key={item.key}
                label={item.label}
                icon={item.icon}
                active={active === item.key}
                onPress={() => {
                  setActive(item.key);
                  setDrawerOpen(false);
                }}
              />
            ))}
          </Drawer.Section>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Button
            icon="menu"
            onPress={() => setDrawerOpen(!drawerOpen)}
            style={styles.menuButton}
          >
            Menu
          </Button>
          <Text variant="headlineSmall" style={styles.heading}>
            Hello world
          </Text>
          <View style={styles.screenContainer}>
            <HomeScreen />
          </View>
        </View>

        {/* Overlay when drawer is open */}
        {drawerOpen && (
          <View
            style={styles.overlay}
            onTouchEnd={() => setDrawerOpen(false)}
          />
        )}
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  drawer: {
    width: 300,
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "white",
    zIndex: 100,
    elevation: 16,
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  heading: {
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  menuButton: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 20,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 50,
  },
});
