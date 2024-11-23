import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

function RefetchTable({
  refetch,
  error,
}: {
  refetch: () => void;
  error: unknown;
}) {
  return (
    <View>
      <Text style={styles.error}>Error: {String(error)}</Text>
      <Button icon="reload" mode="contained" onPress={() => refetch()}>
        <Text>Refetch</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 16,
  },
});

export default RefetchTable;
