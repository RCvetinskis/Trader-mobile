import React, { useTransition } from "react";
import { View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../lib/schemas/zod-schemas";
import { authStyles } from "../../styles/auth/auth.styles";
import { commonStyles } from "../../styles/common.style";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../lib/types";
import { registerUser } from "../../lib/api/user-api";
import Toast from "react-native-toast-message";
type FormData = z.infer<typeof registerSchema>;

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      repeatPassword: "",
    },
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: FormData) => {
    startTransition(async () => {
      try {
        await registerUser(values);
        navigation.navigate("Login");
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
    <View style={authStyles.container}>
      <Text variant="titleLarge" style={authStyles.heading}>
        Welcome to Trader!
      </Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            disabled={isPending}
            label="Name"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            error={!!errors.name}
            style={authStyles.input}
          />
        )}
      />
      {errors.name && (
        <Text style={authStyles.error}>{errors.name.message}</Text>
      )}
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
            style={authStyles.input}
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
            style={authStyles.input}
          />
        )}
      />
      {errors.password && (
        <Text style={authStyles.error}>{errors.password.message}</Text>
      )}
      <Controller
        control={control}
        name="repeatPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            disabled={isPending}
            label="Repeat Password"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={!!errors.repeatPassword}
            style={authStyles.input}
          />
        )}
      />
      {errors.repeatPassword && (
        <Text style={authStyles.error}>{errors.repeatPassword.message}</Text>
      )}

      <View style={commonStyles.alignItemsCenter}>
        <Text>Already have an account?</Text>

        <Button
          disabled={isPending}
          onPress={() => navigation.navigate("Login")}
        >
          Click here to login!
        </Button>
      </View>
      <Button
        disabled={isPending}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={authStyles.button}
      >
        Register
      </Button>
    </View>
  );
};

export default RegisterScreen;
