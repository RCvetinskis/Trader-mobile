import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Control, Controller, FieldErrors } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import { z } from "zod";
import { createPostSchema } from "../../lib/schemas/zod-schemas";
import { Category } from "../../lib/api/category-api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../lib/types";
import { Button, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { commonStyles } from "../../styles/common.style";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

type FormData = z.infer<typeof createPostSchema>;
type Props = {
  name: "category_id" | "subcategory_id";
  placeholder: string;
  categories: Category[];
  isLoading: boolean;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
};

const CategorySelect = ({
  name,
  placeholder,
  categories,
  isLoading,
  control,
  errors,
}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = useStyles(colors);
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No categories available</Text>
        <Button mode="contained" onPress={() => navigation.navigate("Home")}>
          Create Category
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={onChange}
              value={value || 0}
              items={categories.map((cat) => ({
                label: cat.name,
                value: cat.id,
              }))}
              placeholder={{
                label: placeholder,
                value: 0,
                color: "#a0a0a0",
              }}
              style={pickerSelectStyles}
              Icon={() => (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color={colors.primary}
                />
              )}
              useNativeAndroidPickerStyle={false}
            />
          </View>
        )}
      />
      {errors[name] && (
        <Text style={commonStyles.error}>{errors[name].message}</Text>
      )}
    </View>
  );
};

const useStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      marginBottom: 10,
      marginTop: 10,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 10,
      paddingHorizontal: 12,
      backgroundColor: colors.background,
      elevation: 2,
    },
    loadingContainer: {
      padding: 16,
      alignItems: "center",
    },
    emptyContainer: {
      padding: 16,
      alignItems: "center",
    },
    emptyText: {
      fontSize: 16,
      color: "#666",
      marginBottom: 12,
    },
  });

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,

    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,

    paddingRight: 30,
  },
  placeholder: {
    color: "#a0a0a0",
  },
  iconContainer: {
    top: 14,
    right: 12,
  },
});

export default CategorySelect;
