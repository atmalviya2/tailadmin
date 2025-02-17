import { axiosInstance } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

interface OrderStatsParams {
  startDate: string;  // assuming startDate is a formatted string like 'YYYY-MM-DD'
  endDate: string;    // assuming endDate is also a formatted string like 'YYYY-MM-DD'
}
export const useOrderStats = ({ startDate, endDate }: OrderStatsParams) => {
  return useQuery({
    queryKey: ["orderStats"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/orders/orderStats?startDate=${startDate}&endDate=${endDate}`);
      return response?.data?.data?.[0] ?? null;
    },
  });
};
