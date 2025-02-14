import CompletionGauges from '@/components/PercentageCards';
import IncomeCards from '@/components/IncomeCards';
import OrderCountChart from '@/components/OrderCountChart';
import { DriverStatistics } from '@/components/DriverStatistics';
import PieChart from '@/components/ChartThree.tsx';

const OrderData = {
  "totalFinishedOrders": 456,
  "cancelledOrders": 85,
  "completedOrders": 371,
  "completedOnTimeOrders": 244,
  "pickedUpOnTimeOrders": 217,
  "cancelledPercentage": 18.640350877192983,
  "completedOnTimePercentage": 65.76819407008087,
  "pickedUpOnTimePercentage": 58.490566037735846
}
const PaymentData = {
  "total_delivery_fee": 8972.17,
  "total_driver_pay": 11989.78,
  "total_tip": 12696.19,
  "total_income": 8342.98
}
const ZipcodeData = [
  {
    "zipcode": "08901",
    "count": 17,
    "percentage": 4.5822102425876015
  },
  {
    "zipcode": "07652",
    "count": 14,
    "percentage": 3.7735849056603774
  },
  {
    "zipcode": "07701",
    "count": 14,
    "percentage": 3.7735849056603774
  },
  {
    "zipcode": "07052",
    "count": 12,
    "percentage": 3.234501347708895
  },
  {
    "zipcode": "08837",
    "count": 11,
    "percentage": 2.964959568733154
  },
  {
    "zipcode": "07024",
    "count": 10,
    "percentage": 2.6954177897574128
  },
  {
    "zipcode": "08873",
    "count": 8,
    "percentage": 2.15633423180593
  },
  {
    "zipcode": "07070",
    "count": 8,
    "percentage": 2.15633423180593
  },
  {
    "zipcode": "10019",
    "count": 8,
    "percentage": 2.15633423180593
  },
  {
    "zipcode": "08812",
    "count": 4,
    "percentage": 1.078167115902965
  },
  {
    "zipcode": "07102",
    "count": 4,
    "percentage": 1.078167115902965
  },
  {
    "zipcode": "11501",
    "count": 4,
    "percentage": 1.078167115902965
  },
  {
    "zipcode": "07645",
    "count": 4,
    "percentage": 1.078167115902965
  },
  {
    "zipcode": "07901",
    "count": 4,
    "percentage": 1.078167115902965
  },
  {
    "zipcode": "11788",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "07027",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "11576",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "07450",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "11967",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "11746",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "11040",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "07604",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "10543",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "11514",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "07446",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "07006",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "11706",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "07083",
    "count": 3,
    "percentage": 0.8086253369272237
  },
  {
    "zipcode": "07055",
    "count": 2,
    "percentage": 0.5390835579514826
  },
  {
    "zipcode": "07201",
    "count": 2,
    "percentage": 0.5390835579514826
  },
  {
    "zipcode": "11710",
    "count": 2,
    "percentage": 0.5390835579514826
  },
  {
    "zipcode": "10016",
    "count": 2,
    "percentage": 0.5390835579514826
  },
  {
    "zipcode": "10022",
    "count": 2,
    "percentage": 0.5390835579514826
  },
  {
    "zipcode": "08502",
    "count": 1,
    "percentage": 0.2695417789757413
  },
];
const DriverData = [
  {
    "total_orders": 24,
    "total_income": 805.4,
    "driver": "Kary Fajans"
  },
  {
    "total_orders": 16,
    "total_income": 749.3100000000001,
    "driver": "Perla  Gonzalez Ferrer"
  },
  {
    "total_orders": 27,
    "total_income": 645.88,
    "driver": "Victor Samuels"
  },
  {
    "total_orders": 17,
    "total_income": 444.56999999999994,
    "driver": "Raief Razeg"
  },
  {
    "total_orders": 22,
    "total_income": 407.60999999999996,
    "driver": "Alicia sneyer"
  },
  {
    "total_orders": 14,
    "total_income": 393.93,
    "driver": "Melisa Unlu"
  },
  {
    "total_orders": 15,
    "total_income": 333.7199999999999,
    "driver": "Barclay Lasbrey"
  },
  {
    "total_orders": 17,
    "total_income": 309.07,
    "driver": "Katherine Johnson"
  },
  {
    "total_orders": 4,
    "total_income": 293.18000000000006,
    "driver": "Steven Ravel"
  },
  {
    "total_orders": 7,
    "total_income": 281.98,
    "driver": "Iva Bitar"
  },
  {
    "total_orders": 16,
    "total_income": 276.7099999999999,
    "driver": "James Jerbert"
  },
  {
    "total_orders": 8,
    "total_income": 256.67,
    "driver": "Martin Olmeda"
  },
  {
    "total_orders": 16,
    "total_income": 254.42999999999995,
    "driver": "Endy Greene"
  },
  {
    "total_orders": 12,
    "total_income": 244.45000000000002,
    "driver": "Marcio Sandoval"
  },
  {
    "total_orders": 9,
    "total_income": 209.72,
    "driver": "Ida Maldonado"
  },
  {
    "total_orders": 4,
    "total_income": 209.63,
    "driver": "Orville Haye"
  },
  {
    "total_orders": 17,
    "total_income": 206.28999999999996,
    "driver": "Gabriel  Maceda Salazar"
  },
  {
    "total_orders": 8,
    "total_income": 204.86,
    "driver": "Luis Gonzales"
  },
  {
    "total_orders": 9,
    "total_income": 183.29,
    "driver": "Takisha Peters"
  },
  {
    "total_orders": 10,
    "total_income": 175.99999999999997,
    "driver": "Mike Sadofsky"
  },
  {
    "total_orders": 11,
    "total_income": 147.86999999999995,
    "driver": "John  Olmo Jr"
  },
  {
    "total_orders": 4,
    "total_income": 138.18,
    "driver": "Corey Robinson"
  },
  {
    "total_orders": 9,
    "total_income": 134.05999999999995,
    "driver": "AMANDA R  DASILVA"
  },
  {
    "total_orders": 14,
    "total_income": 121.30999999999995,
    "driver": "Michael Millan"
  },
  {
    "total_orders": 6,
    "total_income": 121.24999999999997,
    "driver": "Juan T  Balbuena"
  },
  {
    "total_orders": 4,
    "total_income": 100.88,
    "driver": "Ricardo Torres"
  },
  {
    "total_orders": 7,
    "total_income": 91.67999999999996,
    "driver": "Algeny Martinez"
  },
  {
    "total_orders": 3,
    "total_income": 77.44,
    "driver": "Clive Douglas"
  },
  {
    "total_orders": 4,
    "total_income": 70.33,
    "driver": "Andy Raymond"
  },
  {
    "total_orders": 6,
    "total_income": 67.95999999999998,
    "driver": "Jose  Vazquez Sanchez"
  },
  {
    "total_orders": 1,
    "total_income": 59.67,
    "driver": "julio rojas"
  },
  {
    "total_orders": 2,
    "total_income": 50.18999999999999,
    "driver": "Stephen Finley"
  },
  {
    "total_orders": 4,
    "total_income": 45.67999999999998,
    "driver": "Justina Rodriguez"
  },
  {
    "total_orders": 5,
    "total_income": 42.84999999999998,
    "driver": "Max Jefferson"
  },
  {
    "total_orders": 4,
    "total_income": 41.98999999999998,
    "driver": "Scott Stein"
  },
  {
    "total_orders": 1,
    "total_income": 33.919999999999995,
    "driver": "Ismael Cantu  Pantaleon"
  },
  {
    "total_orders": 1,
    "total_income": 27.04,
    "driver": "Larry Mason"
  },
  {
    "total_orders": 1,
    "total_income": 21.669999999999995,
    "driver": "Yadira Carter"
  },
  {
    "total_orders": 2,
    "total_income": 16.529999999999994,
    "driver": "Nasir Mahmood"
  },
  {
    "total_orders": 2,
    "total_income": 13.839999999999993,
    "driver": "Anaya Khan"
  },
  {
    "total_orders": 2,
    "total_income": 10.339999999999993,
    "driver": "Dwayne Thomas"
  },
  {
    "total_orders": 1,
    "total_income": 7.669999999999995,
    "driver": "Kenit Magana"
  },
  {
    "total_orders": 1,
    "total_income": 7.669999999999995,
    "driver": "MD MIAH"
  },
  {
    "total_orders": 2,
    "total_income": 3.9199999999999946,
    "driver": "Jean Castilla"
  },
  {
    "total_orders": 1,
    "total_income": 2.669999999999998,
    "driver": "Sakinah Brewer"
  },
  {
    "total_orders": 1,
    "total_income": -0.3300000000000054,
    "driver": "Julia Alexander"
  }
]
const ECommerce = () => {
  return (
    <>
      <IncomeCards paymentData={PaymentData} />

      <CompletionGauges orderData={OrderData} />

      <div className="mt-4 grid grid-cols-12 gap-6 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <OrderCountChart orderData={OrderData} />
        <PieChart zipcodeData={ZipcodeData} />
        <div className="col-span-12 xl:col-span-8">
          <DriverStatistics driverData={DriverData} />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
