import ThemeProvider from "@/components/ThemeProvider";
import { screenOptions } from "@/config/local-theme";
import { unauthUrl } from "@/constants/apiUrl";
import { useUserStore } from "@/store/main";
import { postData } from "@/utils/apiService";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { Menu, IconButton } from "react-native-paper";

export default function RootLayout() {
  const { logoutUser, accessToken } = useUserStore();

  const LogoutButton = () => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const deauthorizeStrava = async (accessToken: string | null) => {
      try {
        await postData(false, unauthUrl, {
          accessToken,
        });
      } catch (error) {
        console.error("Error deauthorizing Strava session:", error);
      }
    };

    const handleLogout = async () => {
      if (accessToken) await deauthorizeStrava(accessToken);
      logoutUser();
      router.navigate("/");
    };

    return (
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="dots-vertical" onPressIn={openMenu} />}
      >
        <Menu.Item onPress={async () => await handleLogout()} title="Logout" />
        <Menu.Item
          onPress={() => router.navigate("/monthlyStats")}
          title="Monthly Stats"
        />
      </Menu>
    );
  };

  return (
    <ThemeProvider>
      <Stack screenOptions={screenOptions as unknown as {}}>
        <Stack.Screen
          name="activities"
          options={{ title: "Activities", headerRight: LogoutButton }}
        />
        <Stack.Screen
          name="monthlyStats"
          options={{
            title: "Monthly Stats",
            headerRight: LogoutButton,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
