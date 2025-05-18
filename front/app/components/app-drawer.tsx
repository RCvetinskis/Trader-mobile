import { createDrawerNavigator } from "@react-navigation/drawer";

import React from "react";
import HomeScreen from "../screens/home-screen";
import CustomDrawerContent from "./custom-drawer-content";

type Props = {};

const AppDrawer = (props: Props) => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={(props)=>(<CustomDrawerContent  {...props}/>)}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* add other drawer screens like Profile, Settings here */}
    </Drawer.Navigator>
  );
};

export default AppDrawer;
