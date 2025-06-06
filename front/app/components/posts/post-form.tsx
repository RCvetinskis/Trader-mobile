import React, { useEffect } from "react";
import {  View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
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
    },
  });
  const images = watch("images") || [];

  const category = watch("category_id");

  useEffect(() => {
    setValue("subcategory_id", 0);
  }, [category, setValue]);

  const navigation = useNav();

  const handleImagesChange = (newImages: ImageType[]) => {
    setValue("images", newImages, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (values: FormData) => {
    try {
      await uploadPost(values);
      reset();
      navigation.navigate("Home");
    } catch (error) {}
  };

  const { topLevelCategories, isTopLevelLoading, getSubCategoriesQuery } =
    useCategories();

  const subCategoriesQuery = getSubCategoriesQuery(category);
  const subCategories = subCategoriesQuery.data ?? [];
  // TODO: style form, display posts with images
  return (
    <View>
      <CategorySelect
        name="category_id"
        placeholder="Select a category..."
        categories={topLevelCategories}
        isLoading={isTopLevelLoading}
        control={control}
        errors={errors}
      />

      {category && (
        <CategorySelect
          name="subcategory_id"
          placeholder="Select a subcategory..."
          categories={subCategories}
          isLoading={subCategoriesQuery.isLoading}
          control={control}
          errors={errors}
        />
      )}
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Title"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            error={!!errors.title}
            style={commonStyles.textInput}
            outlineColor="#e0e0e0"
            selectionColor="#6c5ce755"
          />
        )}
      />
      {errors.title && (
        <Text style={commonStyles.error}>{errors.title.message}</Text>
      )}

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Content"
            mode="outlined"
            multiline
            numberOfLines={5}
            value={value}
            onChangeText={onChange}
            error={!!errors.description}
            style={commonStyles.textInput}
            outlineColor="#e0e0e0"
            selectionColor="#6c5ce755"
          />
        )}
      />
      {errors.description && (
        <Text style={commonStyles.error}>{errors.description.message}</Text>
      )}

      <SelectImages images={images} onChange={handleImagesChange} />

      {errors.images && (
        <Text style={commonStyles.error}>{errors.images.message}</Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        style={commonStyles.button}
      >
        Create Post
      </Button>
    </View>
  );
};

export default PostForm;

