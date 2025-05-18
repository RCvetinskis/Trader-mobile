import { useEffect } from "react";
import { useAuthStore } from "../stores/auth-store";
import AsyncStorage from '@react-native-async-storage/async-storage';
const useSetToken = () => {
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {

    const loadToken = async () => {
      const token = await AsyncStorage.getItem("auth_token");

      if (token) {
        setToken(token);
      }
    };
    loadToken();
  }, []);

  return null;
};

export default useSetToken;
