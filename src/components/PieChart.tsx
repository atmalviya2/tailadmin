import { ZipcodeData } from '@/types/zipcode';
import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface PieChartProps {
  zipcodeData: ZipcodeData[] | []
}

const PieChart: React.FC<PieChartProps> = ({ zipcodeData }) => {
  const sortedByCount = [...zipcodeData].sort((a, b) => b.count - a.count);
  const top10ByCount = sortedByCount.slice(0, 10);
  const bottom10ByCount = sortedByCount.slice(-10);

  const zipcodeLabels = zipcodeData.length > 0 
    ? [...top10ByCount.map((zipcode) => zipcode.zipcode), ...bottom10ByCount.map((zipcode) => zipcode.zipcode)]
    : ['No Data'];

  const zipcodeSeries = zipcodeData.length > 0
    ? [...top10ByCount.map((zipcode) => zipcode.count), ...bottom10ByCount.map((zipcode) => zipcode.count)]
    : [100]; 

  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: zipcodeData.length > 0 
      ? ['#10B981', '#375E83', '#259AE6', '#FFA70B']
      : ['#E5E7EB'], 
    labels: zipcodeLabels,
    legend: {
      show: zipcodeData.length > 0,
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
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: zipcodeData.length > 0,
              formatter: function(val) {
                return zipcodeData.length > 0 ? val.toString() : 'No Data';
              }
            },
            total: {
              show: zipcodeData.length === 0,
              label: 'No Data Available',
              formatter: function() {
                return '';
              }
            }
          }
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
            show: false,
          },
        },
      },
    ],
  };

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
