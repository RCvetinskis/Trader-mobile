import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { IconButton } from "react-native-paper";
import useNav from "../hooks/useNav";
import { useRoute } from "@react-navigation/native";
import { AllPostsProp } from "../lib/types";

const GlobalSearch = () => {
  const route = useRoute<AllPostsProp>();
  const searchQuery = route.params?.search ?? "";
  const [value, setValue] = useState(searchQuery);
  const navigation = useNav();

  useEffect(() => {
    setValue(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    navigation.navigate("All Posts", { search: value.trim() });
  };

  const clearSearch = () => {
    setValue("");
    navigation.navigate("All Posts");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={value}
        onChangeText={setValue}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="never"
      />
      {!!value.length && (
        <IconButton
          icon="close"
          size={20}
          onPress={clearSearch}
          style={styles.clearButton}
          accessibilityLabel="Clear search"
        />
      )}
    </View>
  );
};

export default GlobalSearch;
const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    height: 36,
    position: "relative",
  },
  input: {},
  clearButton: {
    position: "absolute",
    top: -6,
    right: 0,
  },
});
