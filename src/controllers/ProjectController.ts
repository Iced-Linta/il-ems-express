import express from "express";
import { createProject, deleteProject, editProject, getProject, getProjects } from "../services/ProjectService";

export const getProjectList = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('project/list.njk', { projects: await getProjects() });
}

export const getProjectDetail = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('project/detail.njk', { project: await getProject(req.params.id) });
}

export const getProjectDeleteForm = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('project/delete.njk', { project: await getProject(req.params.id) });
}

export const postProjectDeleteForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        await deleteProject(req.params.id);
        return res.render('project/deleteSuccess.njk');
    } catch (e) {
        return res.render('project/delete.njk', { project: await getProject(req.params.id), error: e });
    }
}

export const getProjectCreateForm = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('project/create.njk');
}

export const postProjectCreateForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const projectId = await createProject(req.body);
        return res.render('project/createSuccess.njk', { projectId });
    } catch (e) {
        return res.render('project/create.njk', { error: e });
    }
}

export const getProjectEditForm = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('project/edit.njk', { project: await getProject(req.params.id) });
}

export const postProjectEditForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        await editProject(req.body, req.params.id);
        return res.render('project/editSuccess.njk');
    } catch (e) {
        return res.render('project/edit.njk', { project: await getProject(req.params.id), error: e });
    }
}