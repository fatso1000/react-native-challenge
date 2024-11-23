import { View, StyleSheet, TouchableOpacity } from "react-native";

import { router } from "expo-router";
import { useMonthlyStats } from "@/query/useMonthQuery";
import { useMonthStore } from "@/store/months";
import { ActivityIndicator, Text } from "react-native-paper";
import RefetchTable from "@/components/RefetchTable";

export default function monthlyStatsScreen() {
  const { data: monthlyStats, isLoading, refetch, error } = useMonthlyStats();
  const { setSelectedMonth } = useMonthStore();

  if (isLoading) return <ActivityIndicator style={styles.container} />;

  if (error) return <RefetchTable error={error} refetch={refetch} />;

  return (
    <View style={styles.container}>
      {monthlyStats &&
        monthlyStats.map((month) => (
          <TouchableOpacity
            key={month.month}
            style={styles.card}
            onPress={() => {
              setSelectedMonth(month.dateRange);
              router.navigate("/monthDetail");
            }}
          >
            <Text style={styles.month}>{month.month}</Text>
            <Text>Total Distance: {month.totalDistance} m</Text>
            <Text>Total Time: {month.totalTime} sec</Text>
            <Text>Total Elevation: {month.totalElevation} m</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "white",
    color: "white",
  },
  month: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
});
