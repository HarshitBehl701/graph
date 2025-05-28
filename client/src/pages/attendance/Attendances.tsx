import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import LineChartComponent from "@/components/my-components/ChartComponent";

function Attendances() {
  const navigate = useNavigate();
  const data = [
    { name: "User1", attendance: 230 },
    { name: "User2", attendance: 200 },
    { name: "User3", attendance: 180 },
    { name: "User4", attendance: 120 },
  ];
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Attendances</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Login Time</TableHead>
            <TableHead className="text-right">Logout Time</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">123</TableCell>
            <TableCell>03-05-2025</TableCell>
            <TableCell>10:00 AM</TableCell>
            <TableCell className="text-right">06:30 PM</TableCell>
            <TableCell className="text-right flex items-center justify-end gap-3">
              <Button variant={"destructive"} className="cursor-pointer">
                Delete
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                onClick={() => navigate("/attendance?id=123")}
              >
                View
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br /><br />
      <LineChartComponent xAxisDataKey="name" BarDataKey="attendance" data={data} />
    </div>
  );
}

export default Attendances;
