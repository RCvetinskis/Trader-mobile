import React, { useState } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../stores/auth-store";
import { Button, List } from "react-native-paper";

const CustomDrawerContent = (props: any) => {
  const { logout } = useAuthStore();
  const [expandedPosts, setExpandedPosts] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <DrawerContentScrollView {...props}>
        <List.Section>
          <List.Item
            title="Home"
            left={() => <List.Icon icon="home" />}
            onPress={() => props.navigation.navigate("Home")}
          />

          {/* Posts Dropdown */}
          <List.Accordion
            title="Posts"
            left={() => <List.Icon icon="post" />}
            expanded={expandedPosts}
            onPress={() => setExpandedPosts(!expandedPosts)}
          >
            <List.Item
              title="Create Post"
              left={() => <List.Icon icon="folder-plus" />}
              onPress={() => props.navigation.navigate("CreatePost")}
            />
            <List.Item
              title="My Posts"
              left={() => <List.Icon icon="account-card" />}
              onPress={() => props.navigation.navigate("MyPosts")}
            />
            <List.Item
              title="All Posts"
              left={() => <List.Icon icon="post" />}
              onPress={() => props.navigation.navigate("AllPosts")}
            />
          </List.Accordion>
        </List.Section>
      </DrawerContentScrollView>

      {/* Logout */}
      <SafeAreaView style={styles.logoutContainer}>
        <Button
          icon="logout"
          onPress={() => {
            if (logout) logout();
          }}
          style={styles.logoutButton}
          contentStyle={{ flexDirection: "row-reverse" }}
        >
          Logout
        </Button>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingBottom: 5,
    alignItems: "flex-start",
  },
  logoutButton: {
    borderRadius: 8,
  },
});

export default CustomDrawerContent;
