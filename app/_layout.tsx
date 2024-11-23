import ThemeProvider from "@/components/ThemeProvider";
import { screenOptions } from "@/config/local-theme";
import { Slot } from "expo-router";
import { useEffect } from "react";
import { Linking } from "react-native";

export default function RootLayout() {
  useEffect(() => {
    const handleUrl = (event: { url: string }) => {
      const { url } = event;
    };

    const subscription = Linking.addEventListener("url", handleUrl);
    return () => subscription.remove();
  }, []);

  return (
    <ThemeProvider>
      <Slot screenOptions={screenOptions as unknown as {}} />
    </ThemeProvider>
  );
}
