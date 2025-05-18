import React from "react";

import AppNavigation from "./app/components/app-navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useSetToken from "./app/hooks/useSetToken";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function App() {
  useSetToken();
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigation />
      <Toast />
    </QueryClientProvider>
  );
}
