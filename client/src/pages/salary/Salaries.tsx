
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import LineChartComponent from "@/components/my-components/LineChartComponent";


function Salaries() {
  const navigate = useNavigate();
   const data = [
    { name: "Employee1", salaries: 23000 },
    { name: "Employee2", salaries: 20000 },
    { name: "Employee3", salaries: 18000 },
    { name: "Employee4", salaries: 12000 },
  ];
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Salaries</h1>
        <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Id</TableHead>
      <TableHead>Salary</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">123</TableCell>
      <TableCell>12,000</TableCell>
      <TableCell>Active</TableCell>
      <TableCell className="text-right flex items-center justify-end gap-3">
        <Button variant={'destructive'} className="cursor-pointer">Delete</Button>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" onClick={() => navigate('/salary?id=123')}>View</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
 <br /><br />
      <LineChartComponent xAxisDataKey="name" BarDataKey="salaries" data={data} />
    </div>
  )
}

export default Salaries