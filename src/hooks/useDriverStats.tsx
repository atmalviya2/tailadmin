import { axiosInstance } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

interface OrderStatsParams {
  startDate: string;  // assuming startDate is a formatted string like 'YYYY-MM-DD'
  endDate: string;    // assuming endDate is also a formatted string like 'YYYY-MM-DD'
}
export const useDriverStats = ({ startDate, endDate }: OrderStatsParams) => {
  return useQuery({
    queryKey: ["driverStats"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/orders/driverStats?startDate=${startDate}&endDate=${endDate}`);
      console.log("driverdata", response)
      return response?.data?.data ?? null;
    },
  });
};
