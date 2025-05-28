import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartComponent({
  xAxisDataKey,
  BarDataKeys,
  color,
  data,
  widthValue,
  heightValue,
}: {
  xAxisDataKey: string;
  BarDataKeys: string[];
  color?: string;
  data: { [key: string]: any }[];
  widthValue?: string;
  heightValue?: number;
}) {
  console.log(data);
  return (
    <div style={{ width: widthValue ?? "100%", height: heightValue ?? 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisDataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {BarDataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={color ?? ["#8884d8", "#82ca9d"][index % 3]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartComponent;
