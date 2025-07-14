import React from "react";

import AppNavigation from "./app/components/app-navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useSetToken from "./app/hooks/useSetToken";
import Toast from "react-native-toast-message";
import { PaperProvider } from "react-native-paper";
import { theme } from "./app/theme/theme";

const queryClient = new QueryClient();

export default function App() {
  useSetToken();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <AppNavigation />
        <Toast />
      </PaperProvider>
    </QueryClientProvider>
  );
}
