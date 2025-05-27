import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function AttendanceForm() {
    const [formData,setFormData] = useState({
        userId: '',
        date: '',
        loginTime: '',
        logoutTime: ''
    })

    const navigate = useNavigate();

    const handleFormInput = (ev: { target: { name: any; value: any; }; }) => {
        setFormData((prev) => ({...prev,[ev.target.name]:ev.target.value}))
    }

    const handleFormSubmit = useCallback((ev: { preventDefault: () => void; }) => {
        ev.preventDefault()
        try {
            toast('Success',{
                type:"success"
            })
        } catch (error) {
            toast('Something Went Wrong',{
                type:"error"
            })
        }
    },[formData])

  return (  
    <div className="">
      <div className="header flex items-center mb-20 justify-between flex-wrap gap-5">
        <h1 className="text-3xl font-semibold">Attendance Form</h1>
        <Button onClick={() => navigate('/attendances')}>Show Attendances</Button>
      </div>
      <form className="mx-auto border border-lg md:w-1/2 w-[80vw] shadow-md p-4 rounded-md" onSubmit={handleFormSubmit}>
        <div className="mb-5">
          <label
            htmlFor="userId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            User Id
          </label>
          <input
            type="text"
            id="userId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="#123"
            required
            name="userId"
            onChange={handleFormInput}
            value={formData.userId}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="#123"
            required
            name="date"
            onChange={handleFormInput}
            value={formData.date}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="loginTime"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Login In Time
          </label>
          <input
            type="time"
            id="loginTime"
            name="loginTime"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleFormInput}
            value={formData.loginTime}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="loginTime"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Logout Time
          </label>
          <input
            type="time"
            id="logoutTime"
            name="logoutTime"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleFormInput}
            value={formData.logoutTime}
          />
        </div>
        <Button type="reset" variant={'ghost'} className="cursor-pointer hover:underline">Clear</Button>
        <Button type="submit" className="cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</Button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AttendanceForm;