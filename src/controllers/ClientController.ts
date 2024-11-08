import express from "express";
import { createClient, deleteClient, editClient, getClient, getClients } from "../services/ClientService";

export const getClientList = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('client/list.njk', { clients: await getClients() });
}

export const getClientDetail = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('client/detail.njk', { client: await getClient(req.params.id) });
}

export const getClientDeleteForm = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('client/delete.njk', { client: await getClient(req.params.id) });
}

export const postClientDeleteForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        await deleteClient(req.params.id);
        return res.render('client/deleteSuccess.njk');
    } catch (e) {
        return res.render('client/delete.njk', { client: await getClient(req.params.id), error: e });
    }
}

export const getClientCreateForm = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('client/create.njk');
}

export const postClientCreateForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const clientId = await createClient(req.body);
        return res.render('client/createSuccess.njk', { clientId });
    } catch (e) {
        return res.render('client/create.njk', { error: e });
    }
}

export const getClientEditForm = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('client/edit.njk', { client: await getClient(req.params.id) });
}

export const postClientEditForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        await editClient(req.body, req.params.id);
        return res.render('client/editSuccess.njk');
    } catch (e) {
        return res.render('client/edit.njk', { client: await getClient(req.params.id), error: e });
    }
}