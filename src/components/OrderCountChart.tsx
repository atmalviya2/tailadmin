import { OrderData } from '@/types/order';
import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  colors: ['#3C50E0'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: [
      "Total",
      "Cancelled",
      "Completed",
      "Completed On Time",
      "Picked Up On Time"
    ],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',

    // markers: {
    //   radius: 99,
    // },
  },
  fill: {
    opacity: 1,
  },
};

interface BarChartProps {
  orderData: OrderData | null
}
const OrderCountChart: React.FC<BarChartProps> = ({ orderData }) => {
  const data = {
    series: [
      {
        name: 'Orders',
        data: [
          orderData?.totalFinishedOrders,
          orderData?.cancelledOrders,
          orderData?.completedOrders,
          orderData?.completedOnTimeOrders,
          orderData?.pickedUpOnTimeOrders
        ],
      }
    ],
  };

  return (
    <div className="rounded-xl col-span-12 border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Order count
          </h4>
        </div>
      </div>
      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={data.series as any}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderCountChart;
