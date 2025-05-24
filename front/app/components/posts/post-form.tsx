import React from "react";
import { View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "../../lib/schemas/zod-schemas";
import { commonStyles } from "../../styles/common.style";
import Toast from "react-native-toast-message";
import SelectImages from "../select-images";
import { ImageType } from "../../lib/types";
import RNPickerSelect from "react-native-picker-select";
import useCategories from "../../hooks/useCategories";
import CategorySelect from "./category-select";

type FormData = z.infer<typeof createPostSchema>;

const PostForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
      category_id: undefined,
      subcategory_id: undefined,
    },
  });
  const images = watch("images") || [];

  const category = watch("category_id");

  const handleImagesChange = (newImages: ImageType[]) => {
    setValue("images", newImages, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Toast.show({
        type: "success",
        text1: data.images.map((img) => img.name).join(),
        text2: Object.values(data)
          .map((val) => val)
          .join(),
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Failed to create post",
      });
    }
  };

  const { data: categories, isLoading, isError } = useCategories();
  // TODO: finish categories and sub categories and submit form to backend
  const subCategories = [
    {
      parentId: 1,
      id: 4,
      name: "Phones",
    },
  ];
  return (
    <View>
      <CategorySelect
        categories={categories}
        isLoading={isLoading}
        isError={isError}
        control={control}
        errors={errors}
      />

      {category && (
        <>
          <Controller
            control={control}
            name="subcategory_id"
            render={({ field: { onChange, value } }) => (
              <RNPickerSelect
                onValueChange={onChange}
                value={value}
                items={subCategories.map((cat) => ({
                  label: cat.name,
                  value: cat.id,
                }))}
                placeholder={{ label: "Select a subcategory...", value: 0 }}
              />
            )}
          />
          {errors.subcategory_id && (
            <Text style={commonStyles.error}>
              {errors.subcategory_id.message}
            </Text>
          )}
        </>
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
            style={commonStyles.input}
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
            style={commonStyles.input}
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
