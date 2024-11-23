import { Column, IActivities } from "@/types";

export const columns: Column<IActivities>[] = [
  { key: "name", label: "Name" },
  { key: "start_date", label: "Date" },
  { key: "distance", label: "Distance", numeric: true },
  { key: "elapsed_time", label: "Elapsed Time", numeric: true },
  { key: "total_elevation_gain", label: "Elevation", numeric: true },
];
