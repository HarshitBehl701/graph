import axios from "axios";
import { api_routes } from "./api_routes";

export interface Label {
    name: string;
    type: 'text' | 'number';
}

export interface Value {
    label_id: string;
    value: string | number;
}

export const getDataTables = async () => {
    try {
        const response = await axios.get(api_routes.get_data_tables);
        return response.data;
    } catch (error) {
        return [];
    }
}

export const getDataLabels = async (data_id: string) => {
    try {
        const response = await axios.get(`${api_routes.get_data_labels}/${data_id}`);
        return response.data;
    } catch (error) {
        return [];
    }
}

export const getDataLabelsValues = async (data_id: string) => {
    try {
        const response = await axios.get(`${api_routes.get_data_labels_values}/${data_id}`);
        return response.data;
    } catch (error) {
        return [];
    }
}

export const createDataTable = async (formdata: {
    data_name: string;
    labels: Label[];
}) => {
    try {
        const response = await axios.post(api_routes.create_data_table, formdata);
        return response.data;
    } catch (error) {
        return null;
    }
}

export const insertValues = async (formdata: {
    data_id: string;
    values: Value[];
}) => {
    try {
        const response = await axios.post(api_routes.add_values, formdata);
        return response.data;
    } catch (error) {
        return null;
    }
}

export const updateData = async (formdata: {
    id: string;
    data_name?: string;
    is_active?: 0 | 1;
}) => {
    try {
        const response = await axios.post(api_routes.update_data, formdata);
        return response.data;
    } catch (error) {
        return null;
    }
}

export const updateLabel = async (formdata: {
    id: string;
    label_name?: string;
    type?: 'text' | 'number';
    is_active?: 0 | 1;
}) => {
    try {
        const response = await axios.post(api_routes.update_label, formdata);
        return response.data;
    } catch (error) {
        return null;
    }
}

export const updateValue = async (formdata: {
    id: string;
    value?: string;
    is_active?: 0 | 1;
}) => {
    try {
        const response = await axios.post(api_routes.update_value, formdata);
        return response.data;
    } catch (error) {
        return null;
    }
}