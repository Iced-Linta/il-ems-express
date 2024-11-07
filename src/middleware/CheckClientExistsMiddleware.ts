import express from "express";
import { getClient } from "../services/ClientService";

export const checkClientExists = () => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const client = await getClient(req.params.id);
        if (!client) return res.render('errors/404.njk');

        next();
    }
}