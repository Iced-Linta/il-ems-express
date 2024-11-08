import axios, { AxiosResponse } from "axios";
import { ClientResponse } from "../models/ClientResponse";
import { ClientRequest } from "../models/ClientRequest";

export const getClients = async (): Promise<ClientResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.API_URL}/client`);

        return response.data;
    } catch (e) {
        throw new Error('Failed to get clients');
    }
}

export const getClient = async (id: String): Promise<ClientResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.API_URL}/client/${id}`);

        return response.data;
    } catch (e) {
        throw new Error('Failed to get client');
    }
}

export const deleteClient = async (id: String): Promise<void> => {
    try {
        await axios.delete(`${process.env.API_URL}/client/${id}`);
    } catch (e) {
        throw new Error('Failed to delete client');
    }
}

export const createClient = async (client: ClientRequest): Promise<number> => {
    try {
        const response: AxiosResponse = await axios.post(`${process.env.API_URL}/client`, client);

        return response.data;
    } catch (e) {
        throw new Error('Failed to create client');
    }
}

export const editClient = async (client: ClientRequest, id: String): Promise<number> => {
    try {
        const response: AxiosResponse = await axios.put(`${process.env.API_URL}/client/${id}`, client);

        return response.data;
    } catch (e) {
        if (e == "AxiosError: Request failed with status code 404") return null;
        throw new Error('Failed to edit client');
    }
}
