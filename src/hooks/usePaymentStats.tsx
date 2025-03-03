import { axiosInstance } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

interface OrderStatsParams {
  startDate: string;  // assuming startDate is a formatted string like 'YYYY-MM-DD'
  endDate: string;    // assuming endDate is also a formatted string like 'YYYY-MM-DD'
  enabled?: boolean; // default is true
}
export const usePaymentStats = ({ startDate, endDate, enabled = true }: OrderStatsParams) => {
  return useQuery({
    queryKey: ["paymentStats", startDate, endDate],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/orders/paymentStats?startDate=${startDate}&endDate=${endDate}`);
      return response?.data?.data?.[0] ?? null;
    },
    enabled
  });
};
