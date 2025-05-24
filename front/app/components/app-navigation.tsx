import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AppDrawer from "./drawer/app-drawer";
import LoginScreen from "../screens/auth/login-screen";
import RegisterScreen from "../screens/auth/register-screen";
import { useAuthStore } from "../stores/auth-store";
import { navigationRef } from "../navigation/navigation-service";

const RootStack = createNativeStackNavigator();

const AppNavigation = () => {
  const { token } = useAuthStore();

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <RootStack.Screen name="App" component={AppDrawer} />
        ) : (
          <>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
