import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  registerContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginLeft: 4,
  },
});
