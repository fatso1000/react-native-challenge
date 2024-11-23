import { IActivities } from "@/types";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

const GenericDataTable = ({
  columns,
  data,
}: {
  columns: {
    key: string;
    label: string;
    numeric?: boolean;
  }[];
  data: IActivities[];
}) => {
  return (
    <DataTable style={styles.table}>
      <DataTable.Header>
        {columns.map((column) => (
          <DataTable.Title
            key={column.key}
            style={styles.loader}
            numeric={column.numeric}
          >
            {column.label}
          </DataTable.Title>
        ))}
      </DataTable.Header>
      {data &&
        data.map((item: IActivities, index: number) => (
          <DataTable.Row key={item.id || index} style={styles.wFull}>
            {columns.map((column) => (
              <DataTable.Cell
                key={`${item.id || index}-${column.key}`}
                style={styles.loader}
                numeric={column.numeric}
              >
                {item[column.key as keyof IActivities]}
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  table: {
    overflowX: "auto",
    width: "100%",
  },
  loader: {
    flex: 1,
  },
  wFull: { width: "100%" },
});

export default GenericDataTable;
