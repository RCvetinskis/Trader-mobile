import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { ImageType } from "../lib/types";

type Props = {
  images: ImageType[];
  onChange: (images: ImageType[]) => void;
};
const SelectImages = ({ images, onChange }: Props) => {
  const selectImages = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Toast.show({
        type: "error",
        text1: "Permission denied",
        text2: "You need to allow access to your photos.",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.fileName ?? "image.jpg",
        type: "image/jpeg",
      }));
      onChange(selectedImages);
    }
  };

  return (
    <View>
      <Button icon="image" mode="outlined" onPress={selectImages}>
        Select images
      </Button>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        horizontal
        style={{ marginTop: 10 }}
      >
        {images.map((image, index) => (
          <View
            key={index}
            style={{
              position: "relative",
              marginRight: 10,
              width: 150,
              height: 150,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                const newImages = images.filter((_, i) => i !== index);
                onChange(newImages);
              }}
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                zIndex: 1,
                backgroundColor: "black",
                width: 28,
                height: 28,
                borderRadius: 14,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 14 }}>✕</Text>
            </TouchableOpacity>

            <Image
              source={{ uri: image.uri }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 8,
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SelectImages;
