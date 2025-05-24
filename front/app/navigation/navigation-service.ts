import { NavigationContainerRef } from "@react-navigation/native";
import React from "react";

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const NavigationService = {
  navigate: (name: string, params?: any) => {
    navigationRef.current?.navigate(name, params);
  },
};
