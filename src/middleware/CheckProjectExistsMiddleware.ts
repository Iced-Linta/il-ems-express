import express from "express";
import { getProject } from "../services/ProjectService";

export const checkProjectExists = () => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const project = await getProject(req.params.id);
        if (!project) return res.render('errors/404.njk');

        next();
    }
}