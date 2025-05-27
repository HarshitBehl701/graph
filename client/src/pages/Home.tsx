import LineChartComponent from "@/components/my-components/LineChartComponent"

function Home() {

  const data = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 500 },
  { name: 'Apr', sales: 200 },
];
  return (
    <div>
      <LineChartComponent xAxisDataKey="name" BarDataKey="sales" data={data} />
    </div>
  )
}

export default Home