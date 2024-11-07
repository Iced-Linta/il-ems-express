import axios, { AxiosResponse } from "axios";
import { DeliveryEmployeeResponse } from "../models/DeliveryEmployeeResponse";
import { DeliveryEmployeeRequest } from "../models/DeliveryEmployeeRequest";

export const getDeliveryEmployees = async (): Promise<DeliveryEmployeeResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.API_URL}/delivery-employee`);

        return response.data;
    } catch (e) {
        throw new Error('Failed to get delivery employees');
    }
}

export const getDeliveryEmployee = async (id: String): Promise<DeliveryEmployeeResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.API_URL}/delivery-employee/${id}`);

        return response.data;
    } catch (e) {
        throw new Error('Failed to get delivery employee');
    }
}

export const deleteDeliveryEmployee = async (id: String): Promise<void> => {
    try {
        const response: AxiosResponse = await axios.delete(`${process.env.API_URL}/delivery-employee/${id}`);

        return response.data;
    } catch (e) {
        throw new Error(`Failed to delete delivery employee ${id}`);
    }
}

export const createDeliveryEmployee = async (deliveryEmployee: DeliveryEmployeeRequest): Promise<number> => {
    try {
        const deliveryEmployeeRequest = {
            ...deliveryEmployee,
            name: deliveryEmployee.name,
        };

        const response: AxiosResponse = await axios.post(`${process.env.API_URL}/delivery-employee`, deliveryEmployeeRequest);
        return response.data;
    } catch (e) {
        throw new Error('Failed to create delivery employee');
    }
}

export const editDeliveryEmployee = async (deliveryEmployee: DeliveryEmployeeRequest, id: String): Promise<number> => {
    try {
        const deliveryEmployeeRequest = {
            ...deliveryEmployee,
            name: deliveryEmployee.name,
        };

        const response: AxiosResponse = await axios.put(`${process.env.API_URL}/delivery-employee/${id}`, deliveryEmployeeRequest);

        return response.data;
    } catch (e) {
        throw new Error(`Failed to edit delivery employee ${id}`);
    }
}
