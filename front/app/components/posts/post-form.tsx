import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  RadioButton,
  HelperText,
} from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "../../lib/schemas/zod-schemas";
import { commonStyles } from "../../styles/common.style";
import SelectImages from "../select-images";
import { ImageType } from "../../lib/types";
import useCategories from "../../hooks/useCategories";
import CategorySelect from "./category-select";
import { uploadPost } from "../../lib/api/posts-api";
import useNav from "../../hooks/useNav";
import { theme } from "../../theme/theme";
import { useQueryClient } from "@tanstack/react-query";

type FormData = z.infer<typeof createPostSchema>;

const PostForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
      category_id: 0,
      subcategory_id: 0,
      price: "",
      trade: false,
    },
  });
  const images = watch("images") || [];
  const category = watch("category_id");
  const trade = watch("trade");

  useEffect(() => {
    setValue("subcategory_id", 0);
  }, [category, setValue]);

  const navigation = useNav();
  const queryClient = useQueryClient();
  const handleImagesChange = (newImages: ImageType[]) => {
    setValue("images", newImages, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (values: FormData) => {
    try {
      await uploadPost(values);
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
      reset();
      navigation.navigate("Home");
    } catch (error) {}
  };

  const { topLevelCategories, isTopLevelLoading, getSubCategoriesQuery } =
    useCategories();

  const subCategoriesQuery = getSubCategoriesQuery(category);
  const subCategories = subCategoriesQuery.data ?? [];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        {/* Category */}
        <CategorySelect
          name="category_id"
          placeholder="Select a category"
          categories={topLevelCategories}
          isLoading={isTopLevelLoading}
          control={control}
          errors={errors}
        />
        {category > 0 && (
          <CategorySelect
            name="subcategory_id"
            placeholder="Select a subcategory"
            categories={subCategories}
            isLoading={subCategoriesQuery.isLoading}
            control={control}
            errors={errors}
          />
        )}

        {/* Title */}
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                label="Title"
                mode="outlined"
                value={value}
                onChangeText={onChange}
                error={!!errors.title}
                outlineColor={theme.colors.outline}
                selectionColor={theme.colors.primary}
              />
              <HelperText type="error" visible={!!errors.title}>
                {errors.title?.message}
              </HelperText>
            </>
          )}
        />

        {/* Description */}
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                label="Description"
                mode="outlined"
                multiline
                numberOfLines={4}
                value={value}
                onChangeText={onChange}
                error={!!errors.description}
                outlineColor={theme.colors.outline}
                selectionColor={theme.colors.primary}
              />
              <HelperText type="error" visible={!!errors.description}>
                {errors.description?.message}
              </HelperText>
            </>
          )}
        />

        {/* Images */}
        <SelectImages images={images} onChange={handleImagesChange} />
        {errors.images && (
          <HelperText type="error" visible>
            {errors.images.message}
          </HelperText>
        )}

        {/* Trade or Price Radio Buttons */}
        <View style={{ marginVertical: 16 }}>
          <Text variant="titleMedium" style={{ marginBottom: 8 }}>
            Trade Option
          </Text>
          <Controller
            control={control}
            name="trade"
            render={({ field: { onChange, value } }) => (
              <RadioButton.Group
                onValueChange={(val) => onChange(val === "true")}
                value={value ? "true" : "false"}
              >
                <View style={styles.radioRow}>
                  <RadioButton value="true" />
                  <Text style={styles.radioLabel}>Trade</Text>
                </View>
                <View style={styles.radioRow}>
                  <RadioButton value="false" />
                  <Text style={styles.radioLabel}>
                    Not for trade (Price only)
                  </Text>
                </View>
              </RadioButton.Group>
            )}
          />
        </View>
        {!trade && (
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  label="Price"
                  mode="outlined"
                  value={value !== undefined ? String(value) : ""}
                  keyboardType="decimal-pad"
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  error={!!errors.price}
                  outlineColor={theme.colors.outline}
                  selectionColor={theme.colors.primary}
                />
                <HelperText type="error" visible={!!errors.price}>
                  {errors.price?.message}
                </HelperText>
              </>
            )}
          />
        )}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.submitButton}
        >
          Create Post
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PostForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    paddingBottom: 32,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  radioLabel: {
    fontSize: 16,
  },
  submitButton: {
    borderRadius: 6,
  },
});
