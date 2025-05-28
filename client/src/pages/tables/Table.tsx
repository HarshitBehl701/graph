import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { getDataLabelsValues } from "@/api/api_functions";
import { toast, ToastContainer } from "react-toastify";

interface LabelValue {
  id: string;
  value: string;
}

interface TableData {
  label_id: number;
  label_name: string;
  values: LabelValue[];
}

function Table() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [tableData, setTableData] = useState<{data:TableData[]} | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    (async () => {
      try {
        const response = await getDataLabelsValues(id);
        setTableData(response);
      } catch (error) {
        toast.error("Failed to fetch details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (!id) {
    return <p className="text-center text-red-600">No ID specified in URL</p>;
  }

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!tableData || tableData.data.length === 0) {
    return <p className="text-center">No data found for this ID.</p>;
  }

  const detailValues = tableData.data.reduce<Record<string, string>>((acc, label) => {
    acc[label.label_name] = label.values[0]?.value ?? "-";
    return acc;
  }, {});

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-4">Details for ID: {id}</h1>
      <Card>
        {Object.entries(detailValues).map(([labelName, value]) => (
          <CardContent key={labelName} className="border-b last:border-none">
            <p className="text-sm">
              <span className="font-semibold">{labelName}:</span> {value}
            </p>
          </CardContent>
        ))}
      </Card>

      <ToastContainer />
    </div>
  );
}

export default Table;
