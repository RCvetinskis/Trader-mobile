import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { generateAxiosErrorMessage } from "../utils/general-helpers";
import apiClient from "../lib/api/api-client";

type AuthState = {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setToken: (token: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  setToken: (token) => {
    set({ token });
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  login: async (email, password) => {
    try {
      const params = {
        user: {
          email,
          password,
        },
      };

      const response = await apiClient.post("/users/sign_in", params);

      const { token, user } = response.data;

      await AsyncStorage.setItem("auth_token", token);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      set({ token, user });
    } catch (error: any) {
      throw new Error(generateAxiosErrorMessage(error));
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("auth_token");
    await apiClient.delete("/users/sign_out");
    delete apiClient.defaults.headers.common["Authorization"];
    set({ user: null, token: null });
  },
}));
