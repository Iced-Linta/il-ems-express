import axios, { AxiosResponse } from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { RegisterRequest } from "../models/RegisterRequest";

export const getToken = async (loginRequest: LoginRequest): Promise<string> => {
    try {
        const response: AxiosResponse = await axios.post(`${process.env.API_URL}/auth/login`, loginRequest);

        return response.data;
    } catch (e) {
        throw new Error(e.response.data);
    }
}

export const doRegister = async (registerRequest: RegisterRequest): Promise<number> => {
    try {
        const response: AxiosResponse = await axios.post(`${process.env.API_URL}/auth/register`, registerRequest);

        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error(e.response.data);
    }
}