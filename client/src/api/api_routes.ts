const baseUrl = import.meta.env.VITE_BASE_API_URL ?? 'http://127.0.0.1:8000/api';

export const api_routes = {
    get_data_tables: `${baseUrl}/get_data_tables`,
    get_data_labels: `${baseUrl}/get_data_labels`,
    get_data_labels_values: `${baseUrl}/get_data_labels_values`,
    create_data_table: `${baseUrl}/create_data_table`,
    add_values: `${baseUrl}/add_values`,
    update_data: `${baseUrl}/update_data`,
    update_label: `${baseUrl}/update_label`,
    update_value: `${baseUrl}/update_value`,
}