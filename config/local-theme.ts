import { MD2DarkTheme as DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export const screenOptions = {
  contentStyle: {
    backgroundColor: theme.colors.surface,
  },
  headerStyle: {
    backgroundColor: theme.colors.surface,
  },
  headerTintColor: theme.colors.onSurface,
  headerShadowVisible: false,
  presentation: "card",
};
