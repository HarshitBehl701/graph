import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ToastContainer } from "react-toastify";
// import ChartComponent from "@/components/my-components/ChartComponent";

function Table() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const location = useLocation();
  const [,setIsNumValue] = useState(false);
  const {
    data,
    labels,
    table_name,
  }: { data: string[]; labels: string[]; table_name: string } =
    location.state;

  const [loading] = useState(false);

  useEffect(() =>{
    data.forEach(element => {
      if(parseInt(element.split(':')[1])) setIsNumValue(true);
    });
  },[data]);

  if (!id) {
    return <p className="text-center text-red-600">No ID specified in URL</p>;
  }

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center">No data found for this ID.</p>;
  }

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-4">
        Details for {table_name} Table
      </h1>
      <Card>
        {data.map((val, index) => (
          <CardContent key={index} className="border-b last:border-none">
            <p className="text-sm">
              <span className="font-semibold">{labels[index]} :</span>{" "}
              {val.split(":")[1]}
            </p>
          </CardContent>
        ))}
      </Card>
      {/* {isNumValue && data && data.length > 0 && (
        <ChartComponent
          xAxisDataKey={table_name}
          BarDataKey={table_name}
          data={data.map((value,index) => parseInt(value.split(":")[0]) ? {
            [labels[index]]: value
          } : {})}
        />
      )} */}
      <ToastContainer />
    </div>
  );
}

export default Table;
