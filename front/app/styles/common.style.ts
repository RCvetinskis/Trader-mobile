import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  alignItemsCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "#fff",
    fontSize: 16,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  button: {
    marginTop: 12,
  },
});
