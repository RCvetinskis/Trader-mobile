import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import HomeScreen from "../../screens/home-screen";
import CustomDrawerContent from "./custom-drawer-content";
import CreatePostScreen from "../../screens/posts/create-post-screen";

const AppDrawer = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="CreatePost" component={CreatePostScreen} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
