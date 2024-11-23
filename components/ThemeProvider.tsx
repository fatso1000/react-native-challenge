import { theme } from "@/config/local-theme";
import { queryClient } from "@/config/react-query";
import { ReactNode } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { QueryClientProvider } from "react-query";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>{children}</PaperProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
