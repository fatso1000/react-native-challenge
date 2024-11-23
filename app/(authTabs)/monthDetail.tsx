import { View, StyleSheet } from "react-native";
import { useMonthStore } from "@/store/months";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useQuery } from "react-query";
import { fetchData } from "@/utils/apiService";
import { useUserStore } from "@/store/main";
import GenericDataTable from "@/components/GenericTable";
import { columns } from "@/constants/tableColumns";
import { IActivities } from "@/types";
import RefetchTable from "@/components/RefetchTable";

const fetchActivities = async (
  token: string | null,
  selectedMonth: string
): Promise<IActivities[]> => {
  const response = await fetchData(
    "athlete/activities" + selectedMonth,
    token as string
  );

  if (!response) {
    throw new Error("Failed to fetch activities");
  }

  return response as IActivities[];
};

export default function monthlDetailScreen() {
  const { accessToken } = useUserStore();
  const { selectedMonth } = useMonthStore();

  const { data, isLoading, error, refetch } = useQuery(
    ["month-detail", selectedMonth],
    () => fetchActivities(accessToken, selectedMonth)
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      </View>
    );
  }

  if (error) return <RefetchTable error={error} refetch={refetch} />;

  return (
    <View style={styles.container}>
      <GenericDataTable columns={columns} data={data || []} />
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
  loader: {
    flex: 1,
  },
  wFull: { width: "100%" },
});
