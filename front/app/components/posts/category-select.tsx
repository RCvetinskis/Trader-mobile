import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Control, Controller, FieldErrors } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import useCategories from "../../hooks/useCategories";
import { commonStyles } from "../../styles/common.style";
import { z } from "zod";
import { createPostSchema } from "../../lib/schemas/zod-schemas";
import { Category } from "../../lib/api/category-api";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../lib/types";
import { Button } from "react-native-paper";

type FormData = z.infer<typeof createPostSchema>;
type Props = {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
};
const CategorySelect = ({
  categories,
  isLoading,
  isError,
  control,
  errors,
}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  console.log(categories)
  if (!categories || categories.length === 0) {
    <View>
      <Text>Categories not found</Text>
      <Button onPress={() => navigation.navigate("Home")}>
        Create Category
      </Button>
    </View>;
  }

  return (
    <View>
      <Controller
        control={control}
        name="category_id"
        render={({ field: { onChange, value } }) => (
          <RNPickerSelect
            onValueChange={onChange}
            value={value}
            items={categories.map((cat) => ({
              label: cat.name,
              value: cat.id,
            }))}
            placeholder={{ label: "Select a category...", value: null }}
          />
        )}
      />
      {errors.category_id && (
        <Text style={commonStyles.error}>{errors.category_id.message}</Text>
      )}
    </View>
  );
};

export default CategorySelect;
