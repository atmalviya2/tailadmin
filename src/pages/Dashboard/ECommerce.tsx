import CompletionGauges from '@/components/PercentageCards';
import IncomeCards from '@/components/IncomeCards';
import OrderCountChart from '@/components/OrderCountChart';
import { DriverStatistics } from '@/components/DriverStatistics';
import PieChart from '@/components/PieChart';
import { useEffect, useState } from 'react';
import { DatePickerDemo } from '@/components/ui/daypicker';
import moment from "moment";
import { useOrderStats } from '@/hooks/useOrderStats';
import { usePaymentStats } from '@/hooks/usePaymentStats';
import { useDriverStats } from '@/hooks/useDriverStats';
import { useZipcodeStats } from '@/hooks/useZipcodeStats';
import toast from 'react-hot-toast';

const ECommerce = () => {
  const [startDate, setStartDate] = useState<Date>(moment().subtract(1, "months").toDate());
  const [endDate, setEndDate] = useState<Date>(moment().toDate());
  const [isValidDateRange, setIsValidDateRange] = useState<boolean>(true);
  
  useEffect(() => {
    const isValid = moment(endDate).isSameOrAfter(startDate);
    setIsValidDateRange(isValid);
    
    if (!isValid) {
      toast.error('End date must be after start date');
    }
  }, [startDate, endDate]);
  
  const { data: orderData, refetch: refetchOrders } = useOrderStats({
    startDate: moment(startDate).format("YYYY-MM-DD"),
    endDate: moment(endDate).format("YYYY-MM-DD"),
    enabled: isValidDateRange,
  });

  const { data: paymentData, refetch: refetchPayments } = usePaymentStats({
    startDate: moment(startDate).format("YYYY-MM-DD"),
    endDate: moment(endDate).format("YYYY-MM-DD"),
    enabled: isValidDateRange,
  });

  const { data: driverData, refetch: refetchDrivers } = useDriverStats({
    startDate: moment(startDate).format("YYYY-MM-DD"),
    endDate: moment(endDate).format("YYYY-MM-DD"),
    enabled: isValidDateRange,
  });

  const { data: zipcodeData, refetch: refetchZipcodes } = useZipcodeStats({
    startDate: moment(startDate).format("YYYY-MM-DD"),
    endDate: moment(endDate).format("YYYY-MM-DD"),
    enabled: isValidDateRange,
  });

  const handleDateChange = async (date: Date, isStart: boolean) => {
    const newStartDate = isStart ? date : startDate;
    const newEndDate = isStart ? endDate : date;
    
    if (!moment(date).isValid()) {
      toast.error('Invalid date selected');
      return;
    }

    if (moment(newEndDate).isBefore(newStartDate)) {
      toast.error('End date cannot be before start date');
      return;
    }

    if (isStart) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }

    if (moment(newEndDate).isSameOrAfter(newStartDate)) {
      toast.promise(
        Promise.all([
          refetchOrders(),
          refetchPayments(),
          refetchDrivers(),
          refetchZipcodes()
        ]),
        {
          loading: 'Updating dashboard...',
          success: 'Dashboard updated successfully',
          error: 'Failed to update dashboard'
        }
      );
    }
  };

  return (
    <>
      <div className="flex gap-4 mb-4">
        <DatePickerDemo 
          date={startDate} 
          onChange={(date) => handleDateChange(date, true)}
          maxDate={endDate}
        />
        <DatePickerDemo 
          date={endDate} 
          onChange={(date) => handleDateChange(date, false)}
          minDate={startDate}
        />
      </div>

      {isValidDateRange ? (
        <>
          <IncomeCards paymentData={paymentData} />
          <CompletionGauges orderData={orderData} />
          
          <div className="mt-4 grid grid-cols-12 gap-6 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <OrderCountChart orderData={orderData} />
            <PieChart zipcodeData={zipcodeData || []} />
            <div className="col-span-12 xl:col-span-8">
              <DriverStatistics driverData={driverData || []} />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center p-4 text-red-500">
          Please select a valid date range to view the dashboard
        </div>
      )}
    </>
  );
};

export default ECommerce;
