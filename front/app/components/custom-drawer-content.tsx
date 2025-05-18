import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import { useAuthStore } from "../stores/auth-store";

const CustomDrawerContent = (props: any) => {
  const { logout } = useAuthStore();
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Logout"
          onPress={() => {
            if (logout) logout();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingBottom: 10,
  },
});

export default CustomDrawerContent;
