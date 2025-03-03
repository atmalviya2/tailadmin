import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DriverData } from "@/types/driver"
import { useEffect, useState } from "react";

interface DriverStatisticsProps {
  driverData: DriverData[] | []
}
export const DriverStatistics: React.FC<DriverStatisticsProps> = ({ driverData }) => {
  const [sortOrder, setSortOrder] = useState<{ [key: string]: "asc" | "desc" }>(
    {},
  );
  const [sortedData, setSortedData] = useState(driverData);
  useEffect(() => {
    console.log("driverData infrontend", driverData)
    setSortedData(driverData)
  }, [driverData])

  const toggleSortOrder = (key: keyof DriverData) => {
    setSortOrder(prevSortOrder => {
      const newOrder = prevSortOrder[key] === "asc" ? "desc" : "asc";
      return {
        ...prevSortOrder,
        [key]: newOrder,
      };
    });

    setSortedData(prevData => {
      const orderMultiplier = sortOrder[key] === "asc" ? 1 : -1;
      return prevData.sort((a, b) => {
        // Ensure proper comparison if a[key] and b[key] are strings or numbers
        if (a[key] < b[key]) return -1 * orderMultiplier;
        if (a[key] > b[key]) return 1 * orderMultiplier;
        return 0;
      });
    });
  };
  return (
    <Table>
      <TableCaption>A list of your drivers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Rank</TableHead>
          <TableHead className="w-[200px]">Driver</TableHead>
          <TableHead>
            <div className="flex items-center gap-1.5">
              <img
                src="/assets/compare-arrows.svg"
                alt="icon"
                width={19}
                height={19}
                onClick={() => toggleSortOrder("total_orders")}
                className="cursor-pointer"
              />
              Total Orders
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-1.5">
              <img
                src="/assets/compare-arrows.svg"
                alt="icon"
                width={19}
                height={19}
                onClick={() => toggleSortOrder("total_income")}
                className="cursor-pointer"
              />
              Total Earnings
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.slice(0, 10).map((driver, index) => (
          <TableRow key={driver.driver}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{driver.driver}</TableCell>
            <TableCell>{driver.total_orders}</TableCell>
            <TableCell className="text-left">{(driver.total_income).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
