
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useNavigate } from "react-router-dom"


function Users() {
  const navigate = useNavigate()
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Users</h1>
        <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Id</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead className="text-right">Password</TableHead>
      <TableHead className="text-right">Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">123</TableCell>
      <TableCell>Harshit</TableCell>
      <TableCell>harshit@gmail.com</TableCell>
      <TableCell className="text-right">password</TableCell>
      <TableCell className="text-right">Active</TableCell>
      <TableCell className="text-right flex items-center justify-end gap-3">
        <Button variant={'destructive'} className="cursor-pointer">Delete</Button>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" onClick={() => navigate('/user?id=123')}>View</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>

    </div>
  )
}

export default Users