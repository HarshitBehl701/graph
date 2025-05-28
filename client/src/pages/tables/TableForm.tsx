import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { getDataLabels, insertValues } from "@/api/api_functions";

interface Label {
  id: number;
  is_active: string;
  label_name: string;
  type: "text" | "number";
}

function TableForm() {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const name = searchParam.get("name");
  const [labels, setLabels] = useState<Label[] | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  useEffect(() => {
    if (id && labels == null) {
      (async () => {
        try {
          const response = await getDataLabels(id);
          setLabels(response.data);
          const object = response.data
            .map((data: { label_name: any }) => data.label_name)
            .reduce((obj: { [x: string]: string }, key: string | number) => {
              obj[key] = "";
              return obj;
            }, {});
          setFormData(object);
        } catch (error) {
          toast.error("Failed to create data table");
        }
      })();
    }
  }, [labels, id]);

  const handleFormSubmit = useCallback(
    async (ev: { preventDefault: () => void }) => {
      ev.preventDefault();
      try {
        const values = Object.keys(formData).flatMap((value) => {
          const labelId = value.split("/")[1];
          if (labelId) {
            return {
              label_id: labelId,
              value: formData[value],
            };
          }
          return [];
        });
        const requiredData = {
          data_id: "1",
          values: values
        };
        const response = await insertValues(requiredData);
        toast.success("Successfully Inserted Values");
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    },
    [formData]
  );

  return (
    <div className="">
      <div className="header flex items-center mb-20 justify-between flex-wrap gap-5`">
        <h1 className="text-3xl font-semibold">Register {name}</h1>
        <Button
          onClick={() => navigate(`/tables?id=${id}&name=${name}`,{state:{labels:labels}})}
        >
          {name} Tables
        </Button>
      </div>
      <form
        className="mx-auto border border-lg md:w-1/2 w-[80vw] shadow-md p-4 rounded-md"
        onSubmit={handleFormSubmit}
      >
        {labels &&
          labels.length > 0 &&
          labels.map((label) => (
            <div className="mb-5">
              <label
                htmlFor={label.label_name}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {label.label_name}
              </label>
              <input
                type={label.label_name.toLowerCase().includes('date') ? 'date' : label.label_name.toLowerCase().includes('time') ? 'time' : label.type}
                id={label.label_name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={label.label_name}
                required
                name={label.label_name}
                value={formData[`${label.label_name}/${label.id}`]}
                onChange={(ev) =>
                  setFormData((prev) => ({
                    ...prev,
                    [`${label.label_name}/${label.id}`]: ev.target.value,
                  }))
                }
              />
            </div>
          ))}

        <Button
          type="reset"
          variant={"ghost"}
          className="cursor-pointer hover:underline"
        >
          Clear
        </Button>
        <Button
          type="submit"
          className="cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default TableForm;
