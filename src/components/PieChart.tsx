import { ZipcodeData } from '@/types/zipcode';
import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface PieChartProps {
  zipcodeData: ZipcodeData[]
}

const PieChart: React.FC<PieChartProps> = ({ zipcodeData }) => {
  const sortedByCount = [...zipcodeData].sort((a, b) => b.count - a.count);
  const top10ByCount = sortedByCount.slice(0, 10);
  const bottom10ByCount = sortedByCount.slice(-10);

  const zipcodeLabels = [...top10ByCount.map((zipcode) => zipcode.zipcode), ...bottom10ByCount.map((zipcode) => zipcode.zipcode)]
  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: ['#10B981', '#375E83', '#259AE6', '#FFA70B'],
    labels: zipcodeLabels,
    legend: {
      show: true,
      position: 'right',
      onItemClick: {
        toggleDataSeries: true
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
            innerHeight: 400
          },
          legend: {
            show: false, // Hide legend on smaller screens
          },
        },
      },
    ],
  };
  const zipcodeSeries = [...top10ByCount.map((zipcode) => zipcode.count), ...bottom10ByCount.map((zipcode) => zipcode.count)]

  // const [state, setState] = useState<PieChartState>({
  //   series: zipcodeSeries,
  // });

  return (
    <div className="rounded-xl col-span-12 border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Orders by Source
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={zipcodeSeries}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
