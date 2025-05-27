import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { createDataTable } from "@/api_helpers";

function DataTableForm() {
    const [formData, setFormData] = useState({
        data_name: '',
        labels: [{ name: '', type: 'text' }]
    });
    const navigate = useNavigate();

    const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [ev.target.name]: ev.target.value }));
    };

    const handleLabelChange = (index: number, field: string, value: string) => {
        const updatedLabels = [...formData.labels];
        updatedLabels[index] = { ...updatedLabels[index], [field]: value };
        setFormData(prev => ({ ...prev, labels: updatedLabels }));
    };

    const addLabelField = () => {
        setFormData(prev => ({
            ...prev,
            labels: [...prev.labels, { name: '', type: 'text' }]
        }));
    };

    const removeLabelField = (index: number) => {
        if (formData.labels.length > 1) {
            const updatedLabels = formData.labels.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, labels: updatedLabels }));
        }
    };

    const handleFormSubmit = useCallback(async (ev: React.FormEvent) => {
        ev.preventDefault();
        try {
            await createDataTable(formData);
            toast.success('Data table created successfully!');
            setFormData({
                data_name: '',
                labels: [{ name: '', type: 'text' }]
            });
        } catch (error) {
            toast.error('Failed to create data table');
        }
    }, [formData]);

    return (
        <div className="">
            <div className="header flex items-center mb-20 justify-between flex-wrap gap-5">
                <h1 className="text-3xl font-semibold">Create Data Table</h1>
                <Button onClick={() => navigate('/data-tables')}>View Data Tables</Button>
            </div>
            <form className="mx-auto border border-lg md:w-1/2 w-[80vw] shadow-md p-4 rounded-md" onSubmit={handleFormSubmit}>
                <div className="mb-5">
                    <label htmlFor="data_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Table Name
                    </label>
                    <input
                        type="text"
                        id="data_name"
                        name="data_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="e.g. Products"
                        required
                        onChange={handleInputChange}
                        value={formData.data_name}
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Table Columns
                    </label>
                    {formData.labels.map((label, index) => (
                        <div key={index} className="flex gap-2 mb-3">
                            <input
                                type="text"
                                placeholder="Column name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={label.name}
                                onChange={(e) => handleLabelChange(index, 'name', e.target.value)}
                            />
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={label.type}
                                onChange={(e) => handleLabelChange(index, 'type', e.target.value)}
                            >
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                            </select>
                            {formData.labels.length > 1 && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => removeLabelField(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        className="mt-2"
                        onClick={addLabelField}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Column
                    </Button>
                </div>

                <div className="flex gap-2">
                    <Button type="reset" variant={'ghost'}>Clear</Button>
                    <Button type="submit">Create Table</Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default DataTableForm;