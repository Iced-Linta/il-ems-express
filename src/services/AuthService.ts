import axios, { AxiosResponse } from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { RegisterRequest } from "../models/RegisterRequest";
import { IssueMfaRequest } from "../models/IssueMfaRequest";
import { CheckMfaRequest } from "../models/CheckMfaRequest";

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
        throw new Error(e.response.data);
    }
}

export const doIssueMfa = async(issueMfaRequest: IssueMfaRequest): Promise<number> => {
    try {
        const response: AxiosResponse = await axios.post(`${process.env.API_URL}/auth/issueMfa`, issueMfaRequest);

        return response.data;
    } catch (e) {
        throw new Error(e.response.data);
    }
}

export const doCheckMfa = async(checkMfaRequest: CheckMfaRequest): Promise<number> => {
    try {
        const response: AxiosResponse = await axios.post(`${process.env.API_URL}/auth/checkMfa`, checkMfaRequest);

        return response.data;
    } catch (e) {
        throw new Error(e.response.data);
    }
}