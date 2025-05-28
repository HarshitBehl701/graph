import { getDataLabelsValues, updateValue } from "@/api/api_functions";
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
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface TablesData {
  label_id: number;
  label_name: string;
  values: { id: string; value: string }[];
}

function Tables() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const name = searchParam.get("name");
  const location = useLocation();
  const { labels } = location.state;
  const [tableData, setTableData] = useState<TablesData[] | null>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const response = await getDataLabelsValues(id);
          console.log(response.data);
          setTableData(response.data);
        } catch (error) {
          toast.error("Failed to create data table");
        }
      })();
    }
  }, [id]);

  const [rows, setRows] = useState<string[][]>([]);
  const [isPopupShow, setIsPopupShow] = useState(false);
  useEffect(() => {
    if (tableData) {
      const rowCount = tableData[0]?.values.length || 0;
      const newRows: string[][] = [];

      for (let i = 0; i < rowCount; i++) {
        const row: string[] = [];

        tableData.forEach((labelData) => {
          const valueObj = labelData.values[i];
          row.push(`${valueObj?.id}:${valueObj?.value}`);
        });

        newRows.push(row);
      }

      setRows(newRows);
    }
  }, [tableData]);

  const handleDeleteRow = async (id: string) => {
    try {
      await updateValue({ id: id, is_active: 0 });
      if (isPopupShow == false) toast.success("Successfully Deleted Row");
      setIsPopupShow(true);
      window.location.reload();
    } catch (error) {
      toast.error("Something Went Wrong, Please Try Again Later!");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">{name}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            {labels &&
              Array.isArray(labels) &&
              labels.length > 0 &&
              labels.map((label) => (
                <TableHead className="">{label.label_name}</TableHead>
              ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows &&
            rows.length > 0 &&
            rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row &&
                  row.length > 0 &&
                  row.map((data, cellIndex) => (
                    <TableCell key={cellIndex}>{data.split(":")[1]}</TableCell>
                  ))}
                <TableCell className="text-right flex items-center justify-end gap-3">
                  <Button
                    variant={"destructive"}
                    className="cursor-pointer"
                    onClick={() => {
                      row &&
                        row.length > 0 &&
                        row.forEach((data) =>
                          handleDeleteRow(data.split(":")[0])
                        );
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    onClick={() => {
                      const values = row.map((data) => {
                        const [valueId, value] = data.split(":");
                        return { id: valueId, value };
                      });

                      const valuesParam = encodeURIComponent(
                        JSON.stringify(values)
                      );

                      navigate(`/table?id=${id}&values=${valuesParam}`);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <ToastContainer />
    </div>
  );
}

export default Tables;
