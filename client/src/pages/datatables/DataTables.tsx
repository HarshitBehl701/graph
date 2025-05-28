import { getDataTables } from "@/api/api_functions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from "react-toastify";

function DataTables() {
  const navigate = useNavigate();
  const [dataTables, setDataTables] = useState<{id:number;is_active:string;name:string}[] | null>(null);

  useEffect(() => {
    if(dataTables === null)
    {
       (async () => {
      try {
        const response = await getDataTables();
        setDataTables(response.data)
      } catch (error) {
        toast.error("Failed to create data table");
      }
    })();
    }
  }, [dataTables]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Tables</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataTables && dataTables.length > 0 && dataTables.map((data) => <TableRow>
            <TableCell className="font-medium">{data.id}</TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell className="text-right">{data.is_active ? 'Active' : 'In-Active'}</TableCell>
            <TableCell className="text-right flex items-center justify-end gap-3">
              <Button variant={"destructive"} className="cursor-pointer">
                Delete
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                onClick={() => navigate(`/data_table?id=${data.id}`,{state:{table:data}})}
              >
                View
              </Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
      <ToastContainer />
    </div>
  );
}

export default DataTables;
