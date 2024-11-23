import { useQuery } from "react-query";
import { fetchData } from "../../utils/apiService";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useUserStore } from "@/store/main";
import { IActivities } from "@/types";
import RefetchTable from "@/components/RefetchTable";
import GenericDataTable from "@/components/GenericTable";
import { columns } from "@/constants/tableColumns";

export default function ActivitiesScreen() {
  const { accessToken } = useUserStore();

  const { data, isLoading, error, refetch } = useQuery<IActivities[]>(
    ["activities"],
    () =>
      fetchData("/athlete/activities", accessToken || "", {
        per_page: 10,
        page: 1,
      })
  );

  if (isLoading) return <ActivityIndicator style={styles.loader} />;

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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 16,
  },
  loader: {
    flex: 1,
  },
  wFull: { width: "100%" },
});
