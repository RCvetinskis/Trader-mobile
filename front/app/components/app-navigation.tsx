import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AppDrawer from "./app-drawer";
import LoginScreen from "../screens/auth/login-screen";
import RegisterScreen from "../screens/auth/register-screen";
import { useAuthStore } from "../stores/auth-store";

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  const { token } = useAuthStore();
  return (
    <NavigationContainer>
      {token ? (
        <AppDrawer />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
