import { useQuery } from "react-query";
import dayjs from "dayjs";
import { useUserStore } from "@/store/main";
import { fetchData } from "@/utils/apiService";
import { activitiesUrl } from "@/constants/apiUrl";
import { getMonthTimestamps, splitAndFormatDate } from "@/utils/formatters";

const fetchActivities = async (token: string | null): Promise<any[]> => {
  const response = await fetchData(activitiesUrl, token as string);

  if (!response.ok) {
    throw new Error("Failed to fetch activities");
  }

  return await response.json();
};

export const useMonthlyStats = () => {
  const { accessToken } = useUserStore();

  return useQuery(["activities"], () => fetchActivities(accessToken), {
    select: (data) => {
      const lastThreeMonths = [0, 1, 2].map((i) =>
        dayjs().subtract(i, "month").format("YYYY-MM")
      );

      const aggregatedData = lastThreeMonths.map((month) => {
        const monthlyActivities = data.filter(
          (activity) => dayjs(activity.start_date).format("YYYY-MM") === month
        );
        const { month: formatMonth, year } = splitAndFormatDate(month);
        const timestamps = getMonthTimestamps(year, formatMonth);

        return {
          dateRange: timestamps,
          month,
          totalDistance: monthlyActivities.reduce(
            (sum, activity) => sum + activity.distance,
            0
          ),
          totalTime: monthlyActivities.reduce(
            (sum, activity) => sum + activity.moving_time,
            0
          ),
          totalElevation: monthlyActivities.reduce(
            (sum, activity) => sum + activity.total_elevation_gain,
            0
          ),
        };
      });

      return aggregatedData;
    },
  });
};
