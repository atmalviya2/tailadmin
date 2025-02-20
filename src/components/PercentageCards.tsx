/* eslint-disable @typescript-eslint/no-explicit-any */
import GaugeChart from "react-gauge-chart";
import React from "react";
import { OrderData } from "@/types/order";
interface CompletionGaugeProps {
  orderData: OrderData | null
}
const CompletionGauges: React.FC<CompletionGaugeProps> = ({ orderData }) => {
  const guageData = [
    {
      title: "Cancelled Order",
      percentage: orderData?.cancelledPercentage
    },
    {
      title: "Completed On Time",
      percentage: orderData?.completedOnTimePercentage
    },
    {
      title: "Picked On Time",
      percentage: orderData?.pickedUpOnTimePercentage
    }
  ]

  return (
    <div className="mt-4  grid grid-cols-1 gap-4 md:grid-cols-3 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      {guageData?.map((data, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center rounded-2xl border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <h2 className="text-lg font-bold mb-2">{data.title}</h2>
          <GaugeChart
            id={`gauge-chart-${index}`}
            nrOfLevels={20}
            colors={["#8083F8", "#F87070"]}
            arcWidth={0.3}
            percent={data?.percentage as number / 100}
            textColor="#000"
          />
          <p className="text-xl font-semibold mt-2">
            {Math.round(data?.percentage as number)}%
          </p>
        </div>
      ))}
    </div>
  );
};

export default CompletionGauges;

