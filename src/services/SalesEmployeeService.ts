import axios, { AxiosResponse } from "axios";
import { SalesEmployeeResponse } from "../models/SalesEmployeeResponse";
import { SalesEmployeeRequest } from "../models/SalesEmployeeRequest";

export const getSalesEmployees = async (): Promise<SalesEmployeeResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.API_URL}/sales-employee`);

        return response.data;
    } catch (e) {
        throw new Error('Failed to get sales employees');
    }
}

export const getSalesEmployee = async (id: String): Promise<SalesEmployeeResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.API_URL}/sales-employee/${id}`);

        return response.data;
    } catch (e) {
        throw new Error('Failed to get sales employee');
    }
}

export const deleteSalesEmployee = async (id: String): Promise<void> => {
    try {
        const response: AxiosResponse = await axios.delete(`${process.env.API_URL}/sales-employee/${id}`);

        return response.data;
    } catch (e) {
        throw new Error('Failed to delete sales employee');
    }
}

export const createSalesEmployee = async (salesEmployee: SalesEmployeeRequest): Promise<number> => {
    try {
        const salesEmployeeRequest = {
            ...salesEmployee,
            firstName: salesEmployee.fullName.split(' ')[0],
            lastName: salesEmployee.fullName.split(' ').slice(1).join(' '),
            commissionRate: salesEmployee.commissionRatePercentage / 100
        };

        const response: AxiosResponse = await axios.post(`${process.env.API_URL}/sales-employee`, salesEmployeeRequest);

        return response.data;
    } catch (e) {
        throw new Error('Failed to delete sales employee');
    }
}

export const editSalesEmployee = async (salesEmployee: SalesEmployeeRequest, id: String): Promise<number> => {
    try {
        const salesEmployeeRequest = {
            ...salesEmployee,
            firstName: salesEmployee.fullName.split(' ')[0],
            lastName: salesEmployee.fullName.split(' ').slice(1).join(' '),
            commissionRate: salesEmployee.commissionRatePercentage / 100
        };

        const response: AxiosResponse = await axios.put(`${process.env.API_URL}/sales-employee/${id}`, salesEmployeeRequest);

        return response.data;
    } catch (e) {
        if (e == "AxiosError: Request failed with status code 404") return null;
        throw new Error('Failed to edit sales employee');
    }
}
