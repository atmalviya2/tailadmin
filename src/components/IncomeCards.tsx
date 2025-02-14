/* eslint-disable @typescript-eslint/no-unused-vars */

import { PaymentData } from "@/types/payment";

interface IncomeCardsProps {
  paymentData: PaymentData
}
const IncomeCards: React.FC<IncomeCardsProps> = ({ paymentData }) => {
  const cardData = [
    {
      title: "Total Delivery Fee",
      value: paymentData?.total_delivery_fee?.toFixed(2) || "0.00",
      color: "#50C878",
    },
    {
      title: "Total Driver Pay",
      value: paymentData?.total_driver_pay?.toFixed(2) || "0.00",
      color: "#4169E1",
    },
    {
      title: "Total Tip",
      value: paymentData?.total_tip?.toFixed(2) || "0.00",
      color: "#E7CBA7",
    },
    {
      title: "Total Income",
      value: paymentData?.total_income?.toFixed(2) || "0.00",
      color: "#8E4585",
    },
  ];

  return (
    <div className="mt-4  grid grid-cols-1 gap-4 md:grid-cols-2  xl:grid-cols-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center rounded-2xl border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
          style={{
            borderBottom: `3.5px solid ${card.color}`,
          }}
        >
          <h1 className="text-base font-semibold text-gray-800">{card.title}</h1>
          <p className="text-2xl font-bold text-gray-800">${card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default IncomeCards;
