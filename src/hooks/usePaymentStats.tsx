import { axiosInstance } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

interface OrderStatsParams {
  startDate: string;  // assuming startDate is a formatted string like 'YYYY-MM-DD'
  endDate: string;    // assuming endDate is also a formatted string like 'YYYY-MM-DD'
}
export const usePaymentStats = ({ startDate, endDate }: OrderStatsParams) => {
  return useQuery({
    queryKey: ["paymentStats"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/orders/paymentStats?startDate=${startDate}&endDate=${endDate}`);
      return response?.data?.data?.[0] ?? null;
    },
  });
};
