import { BarChart, Bar, ResponsiveContainer, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

function ChartComponent({xAxisDataKey,BarDataKey,color,data,widthValue,heightValue}:{xAxisDataKey:string;BarDataKey:string,color?:string;data:{[key:string]:any}[];widthValue?:string;heightValue?:number}) {
console.log(data)
  return (
      <div style={{ width: widthValue ?? '100%', height: heightValue ?? 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisDataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={BarDataKey} fill={color ?? "#8884d8"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartComponent;
