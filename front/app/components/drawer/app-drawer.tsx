import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import HomeScreen from "../../screens/home-screen";
import CustomDrawerContent from "./custom-drawer-content";
import CreatePostScreen from "../../screens/posts/create-post-screen";
import GlobalSearch from "../global_search";
import AllPostsScreen from "../../screens/posts/all-posts-screen";
import MyPostsScreen from "../../screens/posts/my-posts-screen";

const AppDrawer = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={() => ({
        headerRight: () => <GlobalSearch />,
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Create Post" component={CreatePostScreen} />
      <Drawer.Screen name="All Posts" component={AllPostsScreen} />
      <Drawer.Screen name="My Posts" component={MyPostsScreen} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
