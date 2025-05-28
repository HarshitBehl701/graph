import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';


function Home() {
    const [passwordToggle,setPasswordToggle] = useState(false);
    const [formData,setFormData] = useState({
        name: '',
        email: '',
        password: ''
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
      <div className="header flex items-center mb-20 justify-between flex-wrap gap-5`">
        <h1 className="text-3xl font-semibold">Register User</h1>
        <Button onClick={() => navigate('/users')}>Users Tables</Button>
      </div>
      <form className="mx-auto border border-lg md:w-1/2 w-[80vw] shadow-md p-4 rounded-md" onSubmit={handleFormSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g. John Smith"
            required
            name="name"
            onChange={handleFormInput}
            value={formData.name}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john@email.com"
            required
             onChange={handleFormInput}
            value={formData.email}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <div className="relative">
            <input
            type={passwordToggle ? 'text' : "password"}
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
             onChange={handleFormInput}
            value={formData.password}
          />
          <button type="button" className="cursor-pointer" onClick={() => setPasswordToggle(!passwordToggle)}>{!passwordToggle ? <EyeClosed className="absolute right-2 top-2" /> : <Eye className="absolute right-2 top-2" />}</button>
          </div>
        </div>
        <Button type="reset" variant={'ghost'} className="cursor-pointer hover:underline">Clear</Button>
        <Button type="submit" className="cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</Button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Home;
