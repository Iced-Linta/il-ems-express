import express from "express";
import { getClient } from "../services/ClientService";

export const checkClientExists = () => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const client = await getClient(req.params.id);
        } catch (e) {
            throw new Error('Failed to delete client');
        }

        next();
    }
}