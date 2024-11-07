import axios, { AxiosResponse } from "axios";
import { ProjectRequest } from "../models/ProjectRequest";
import { ProjectResponse } from "../models/ProjectResponse";

export const getProjects = async (): Promise<ProjectResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.API_URL}/project`);

        return response.data;
    } catch (e) {
        throw new Error('Failed to get project');
    }
}

export const getProject = async (id: String): Promise<ProjectResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.API_URL}/project/${id}`);

        return response.data;
    } catch (e) {
        throw new Error('Failed to get project');
    }
}

export const deleteProject = async (id: String): Promise<void> => {
    try {
        const response: AxiosResponse = await axios.delete(`${process.env.API_URL}/project/${id}`);

        return response.data;
    } catch (e) {
        throw new Error('Failed to delete project');
    }
}

export const createProject = async (project: ProjectRequest): Promise<number> => {
    try {
        const response: AxiosResponse = await axios.post(`${process.env.API_URL}/project`, project);

        return response.data;
    } catch (e) {
        throw new Error('Failed to delete project');
    }
}

export const editProject = async (project: ProjectRequest, id: String): Promise<number> => {
    try {
        const response: AxiosResponse = await axios.put(`${process.env.API_URL}/project/${id}`, project);

        return response.data;
    } catch (e) {
        if (e == "AxiosError: Request failed with status code 404") return null;
        throw new Error('Failed to edit project');
    }

}