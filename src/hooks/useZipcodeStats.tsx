import { axiosInstance } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

interface OrderStatsParams {
  startDate: string;  // assuming startDate is a formatted string like 'YYYY-MM-DD'
  endDate: string;    // assuming endDate is also a formatted string like 'YYYY-MM-DD'
  enabled?: boolean;
}
export const useZipcodeStats = ({ startDate, endDate, enabled = true }: OrderStatsParams) => {
  return useQuery({
    queryKey: ["zipcodeStats", startDate, endDate],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/orders/zipcodeStats?startDate=${startDate}&endDate=${endDate}`);
      console.log("zipcode response", response)
      return response?.data?.data ?? null;
    },
    enabled
  });
};
