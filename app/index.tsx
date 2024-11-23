import React from "react";
import { View, StyleSheet } from "react-native";
import { useStravaAuth } from "../utils/auth";
import { Text, Button } from "react-native-paper";
import { theme } from "@/config/local-theme";

export default function LoginScreen() {
  const { request, promptAsync } = useStravaAuth();

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text>Login with Strava</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: theme.colors.surface,
  },
});
