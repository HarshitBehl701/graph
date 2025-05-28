import { getDataLabelsValues, updateValue } from "@/api/api_functions";
import ChartComponent from "@/components/my-components/ChartComponent";
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
  const [chartData, setChartData] = useState<{ [key: string]: any }[]>();

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

  const getPreferredXAxisLabel = (labels: TablesData[]) => {
    const preferredKeys = ["name", "email", "id"];
    for (const key of preferredKeys) {
      const found = labels.find((label) =>
        label.label_name.toLowerCase().includes(key)
      );
      if (found) return found.label_name;
    }
    return null;
  };

  useEffect(() => {
    if (tableData) {
      const rowCount = tableData[0]?.values.length || 0;
      const newRows: string[][] = [];
      const xAxisKey = getPreferredXAxisLabel(tableData);
      const newChartData: { [key: string]: any }[] = [];

      for (let i = 0; i < rowCount; i++) {
        const row: string[] = [];
        const chartRow: { [key: string]: any } = {};

        tableData.forEach((labelData) => {
          const valueObj = labelData.values[i];
          const labelName = labelData.label_name;
          const value = valueObj?.value;
          row.push(`${valueObj?.id}:${valueObj?.value}`);
          if (labelName === xAxisKey) {
            chartRow["name"] = value;
          } else if (!isNaN(parseFloat(value)) && isFinite(Number(value))) {
            chartRow[labelName] = Number(value);
          }
        });

        newRows.push(row);
        if (Object.keys(chartRow).length > 0) {
          newChartData.push(chartRow);
        }
      }

      setRows(newRows);
      setChartData(newChartData);
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

  console.log(chartData);

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
                      navigate(`/table?id=${id}`, {
                        state: {
                          data: row,
                          labels: labels.map(
                            (label: { label_name: any }) => label.label_name
                          ),
                          table_name: name,
                        },
                      });
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <br />
      <br />
      {chartData && chartData.length > 0 && (
        <ChartComponent
          xAxisDataKey="name"
          BarDataKeys={Object.keys(chartData[0]).filter(
            (key) => key !== "name"
          )}
          data={chartData}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default Tables;
