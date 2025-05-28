import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import UserForm from "./pages/user/UserForm"
import Users from "./pages/user/Users"
import AttendanceForm from "./pages/attendance/AttendanceForm"
import Attendances from "./pages/attendance/Attendances"
import SalaryForm from "./pages/salary/SalaryForm"
import Salaries from "./pages/salary/Salaries"
import User from "./pages/user/User"
import Attendance from "./pages/attendance/Attendance"
import Salary from "./pages/salary/Salary"
import Home from "./pages/Home"

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/create_table" element={<Layout><Home /></Layout>} />
        <Route path="/users_register" element={<Layout><UserForm /></Layout>} />
        <Route path="/users" element={<Layout><Users /></Layout>} />
        <Route path="/user" element={<Layout><User /></Layout>} />
        <Route path="/attendance_register" element={<Layout><AttendanceForm /></Layout>} />
        <Route path="/attendances" element={<Layout><Attendances /></Layout>} />
        <Route path="/attendance" element={<Layout><Attendance /></Layout>} />
        <Route path="/salary_register" element={<Layout><SalaryForm /></Layout>} />
        <Route path="/salaries" element={<Layout><Salaries /></Layout>} />
        <Route path="/salary" element={<Layout><Salary /></Layout>} />
    </Routes>
  )
}

export default App