import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

function Salary() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-4">Salary Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Name</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            <span className="font-semibold">Email : </span>{" "}
            <span>email@email.com</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">Password : </span>{" "}
            <span>password</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">Registration Date : </span>{" "}
            <span>05-05-2025</span>
          </p>
          <div className="buttons flex items-center gap-2">
            <Button className="bg-green-700 cursor-pointer mt-2 hover:bg-green-800">
              Edit
            </Button>
            <Button className="bg-blue-600 cursor-pointer mt-2 hover:bg-blue-700">
              View
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="salary mt-5 p-3">
        <h1 className="font-semibold text-2xl mb-4">Salary</h1>
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
                <Button variant={"destructive"} className="cursor-pointer">
                  Delete
                </Button>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  onClick={() => navigate("/salary?id=123")}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Salary;
