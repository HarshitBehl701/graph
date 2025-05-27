import axios from "axios";
import { api_routes } from "./api_routes";

export const getDataTables = async () => {
    try {
        const response = await axios.get(api_routes['get_data_tables']);
        return response;
    } catch (error) {
        return []
    }
}

export const getDataLabels = async (data_id:string) => {
    try {
        const response = await axios.get(api_routes['get_data_labels']+`/${data_id}`);
        return response;
    } catch (error) {
        return []
    }
}

export const getDataLabelsValues = async (data_id:string) => {
    try {
        const response = await axios.get(api_routes['get_data_labels_values']+`/${data_id}`);
        return response;
    } catch (error) {
        return []
    }
}

export const createDataTable = async (formdata:{
    data_name: string,
    labels:{
        name:string,
        value:string | number
    }[]
}) => {
    try {
        const response = await axios.post(api_routes['create_data_table'],formdata);
        return response;
    } catch (error) {
        return []
    }
}

export const insertValues = async (formdata:{
    data_name: string,
    values:{
        label_id:string,
        value:string | number
    }[]
}) => {
    try {
        const response = await axios.post(api_routes['add_values'],formdata);
        return response;
    } catch (error) {
        return []
    }
}

export const updateData = async (formdata:{
    data_name?: string,
    is_active?: 0 | 1,
}) => {
    try {
        const response = await axios.post(api_routes['update_data'],formdata);
        return response;
    } catch (error) {
        return []
    }
}

export const updateLabel = async (formdata:{
    label_id?: string,
    label_name?: string,
    type?: string | number,
    is_active?: 0 | 1,
}) => {
    try {
        const response = await axios.post(api_routes['update_label'],formdata);
        return response;
    } catch (error) {
        return []
    }
}


export const updateValue = async (formdata:{
    value_id?: string,
    value?: string,
    is_active?: 0 | 1,
}) => {
    try {
        const response = await axios.post(api_routes['update_value'],formdata);
        return response;
    } catch (error) {
        return []
    }
}
