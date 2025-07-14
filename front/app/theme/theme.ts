import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";


export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#80D8C3",
    secondary: "#4DA8DA",
    background: "#F5F5F5",
    surface: "#fff",
    text: "#333",
    shadow:'#80D8C3',
    outline: "#80D8C3",
    error:'#F75A5A'
  },
};
