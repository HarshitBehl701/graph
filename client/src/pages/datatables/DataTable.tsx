import { getDataLabels } from "@/api/api_functions";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Label {
    id: number;
    is_active: string;
    label_name:string;
    type: 'text' | "number";
}

function DataTable() {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const [labels, setLabels] = useState<Label[] | null>(null);
  const location = useLocation();
  const { table } = location.state;

  useEffect(() => {
    if (id && labels == null) {
      (async () => {
        try {
          const response = await getDataLabels(id);
          setLabels(response.data);
        } catch (error) {
          toast.error("Failed to create data table");
        }
      })();
    }
  }, [labels, id]);
  

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-4">
        Table Details ({table.name})
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {labels &&
            labels.length > 0 &&
            labels.map((label) => (
              <TableRow>
                <TableCell className="font-medium">{label.id}</TableCell>
                <TableCell>{label.label_name}</TableCell>
                <TableCell>{label.type}</TableCell>
                <TableCell className="text-right">
                  {label.is_active ? "Active" : "In-Active"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <ToastContainer />
    </div>
  );
}

export default DataTable;
