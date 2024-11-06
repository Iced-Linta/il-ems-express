import axios, { AxiosResponse } from "axios";
import { SalesEmployeeResponse } from "../models/SalesEmployeeResponse";
import { SalesEmployeeRequest } from "../models/SalesEmployeeRequest";

export const getSalesEmployees = async (): Promise<SalesEmployeeResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/sales-employee");

        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get sales employees');
    }
}

export const getSalesEmployee = async (id: String): Promise<SalesEmployeeResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/sales-employee/" + id);

        return response.data;
    } catch (e) {
        if (e == "AxiosError: Request failed with status code 404") return null;
        throw new Error('Failed to get sales employee');
    }
}

export const deleteSalesEmployee = async (id: String): Promise<void> => {
    try {
        const response: AxiosResponse = await axios.delete("http://localhost:8080/api/sales-employee/" + id);

        return response.data;
    } catch (e) {
        if (e == "AxiosError: Request failed with status code 404") return null;
        throw new Error('Failed to delete sales employee');
    }
}
