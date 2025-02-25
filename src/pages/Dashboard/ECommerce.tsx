import CompletionGauges from '@/components/PercentageCards';
import IncomeCards from '@/components/IncomeCards';
import OrderCountChart from '@/components/OrderCountChart';
import { DriverStatistics } from '@/components/DriverStatistics';
import PieChart from '@/components/PieChart';
import { useEffect, useState } from 'react';
import { DatePickerDemo } from '@/components/ui/daypicker';
import moment from "moment";
import { OrderData } from '@/types/order';
import { PaymentData } from '@/types/payment';
import { ZipcodeData } from '@/types/zipcode';
import { DriverData } from '@/types/driver';
import { useOrderStats } from '@/hooks/useOrderStats';
import { usePaymentStats } from '@/hooks/usePaymentStats';
import { useDriverStats } from '@/hooks/useDriverStats';
import { useZipcodeStats } from '@/hooks/useZipcodeStats';

const ECommerce = () => {
  const [startDate, setStartDate] = useState<Date>(moment().subtract(1, "months").toDate());
  const [endDate, setEndDate] = useState<Date>(moment().toDate());
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [zipcodeData, setZipcodeData] = useState<ZipcodeData[] | []>([]);
  const [driverData, setDriverData] = useState<DriverData[] | []>([]);
  // const [paymentData,setPaymentData] = use
  const { data: orderDataBack, refetch: orderRefetchBack } = useOrderStats({
    startDate: moment(startDate).format("YYYY-MM-DD"),
    endDate: moment(endDate).format("YYYY-MM-DD"),
  });
  const { data: paymentDataBack, refetch: paymentRefetchBack } = usePaymentStats({
    startDate: moment(startDate).format("YYYY-MM-DD"),
    endDate: moment(endDate).format("YYYY-MM-DD"),
  });
  const { data: driverDataBack, refetch: driverRefetchBack } = useDriverStats({
    startDate: moment(startDate).format("YYYY-MM-DD"),
    endDate: moment(endDate).format("YYYY-MM-DD"),
  });
  const { data: zipcodeDataBack, refetch: zipcodeRefetchBack } = useZipcodeStats({
    startDate: moment(startDate).format("YYYY-MM-DD"),
    endDate: moment(endDate).format("YYYY-MM-DD"),
  });
  const handleStartDate = async (date: Date) => {
    await setStartDate(date);
    orderRefetchBack();
    paymentRefetchBack();
    driverRefetchBack();
    zipcodeRefetchBack();
  }
  const handleEndDate = async (date: Date) => {
    await setEndDate(date);
    paymentRefetchBack();
    orderRefetchBack();
    driverRefetchBack();
    zipcodeRefetchBack();
  }

  useEffect(() => {
    if (orderDataBack && paymentDataBack && driverDataBack && zipcodeDataBack) {
      setOrderData(orderDataBack);
      setPaymentData(paymentDataBack);
      setDriverData(driverDataBack);
      setZipcodeData(zipcodeDataBack);
    }
  }, [orderDataBack, paymentDataBack, driverDataBack, zipcodeDataBack]);
  return (
    <>
      <DatePickerDemo date={startDate} onChange={handleStartDate} />
      <DatePickerDemo date={endDate} onChange={handleEndDate} />
      <IncomeCards paymentData={paymentData} />
      <CompletionGauges orderData={orderData} />
      <div className="mt-4 grid grid-cols-12 gap-6 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <OrderCountChart orderData={orderData} />
        <PieChart zipcodeData={zipcodeData} />
        <div className="col-span-12 xl:col-span-8">
          <DriverStatistics driverData={driverData} />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
