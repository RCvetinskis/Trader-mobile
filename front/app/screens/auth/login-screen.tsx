import React, { useTransition } from "react";
import { View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../lib/schemas/zod-schemas";
import { authStyles } from "../../styles/auth/auth.styles";
import { commonStyles } from "../../styles/common.style";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../lib/types";

import Toast from "react-native-toast-message";
import { useAuthStore } from "../../stores/auth-store";
import ScreenContainer from "../../components/screen-container";
type FormData = z.infer<typeof loginSchema>;

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: FormData) => {
    startTransition(async () => {
      try {
        await useAuthStore.getState().login(values.email, values.password);
      } catch (error) {
        if (error instanceof Error) {
          Toast.show({
            type: "error",
            text1: "Something went wrong",
            text2: error.message,
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Something went wrong",
            text2: "Unknown error occurred",
          });
        }
      }
    });
  };

  return (
    <ScreenContainer style={authStyles.container}>
      <Text variant="titleLarge" style={authStyles.heading}>
        Welcome to Trader!
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            disabled={isPending}
            label="Email"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!errors.email}
            style={commonStyles.textInput}
          />
        )}
      />
      {errors.email && (
        <Text style={authStyles.error}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            disabled={isPending}
            label="Password"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={!!errors.password}
            style={commonStyles.textInput}
          />
        )}
      />
      {errors.password && (
        <Text style={authStyles.error}>{errors.password.message}</Text>
      )}

      <View style={commonStyles.alignItemsCenter}>
        <Text>Don't have an account?</Text>

        <Button
          disabled={isPending}
          onPress={() => navigation.navigate("Register")}
        >
          Click here to register!
        </Button>
      </View>
      <Button
        disabled={isPending}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={authStyles.button}
      >
        Login
      </Button>
    </ScreenContainer>
  );
};

export default LoginScreen;
