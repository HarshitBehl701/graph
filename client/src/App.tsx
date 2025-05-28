import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import DataTableForm from "./pages/datatables/DataTableForm"
import DataTables from "./pages/datatables/DataTables"
import DataTable from "./pages/datatables/DataTable"
import TableForm from "./pages/tables/TableForm"
import Tables from "./pages/tables/Tables"
import Table from "./pages/tables/Table"

function App() {
  return (
    <Routes>
        <Route path="/" element={<Navigate to={'/create_table'} />} />
        <Route path="/create_table" element={<Layout><DataTableForm /></Layout>} />
        <Route path="/data_tables" element={<Layout><DataTables /></Layout>} />
        <Route path="/data_table" element={<Layout><DataTable /></Layout>} />
        <Route path="/table_form" element={<Layout><TableForm /></Layout>} />
        <Route path="/tables" element={<Layout><Tables /></Layout>} />
        <Route path="/table" element={<Layout><Table /></Layout>} />
    </Routes>
  )
}

export default App