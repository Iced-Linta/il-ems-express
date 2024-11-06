import express from "express";
import { createSalesEmployee, deleteSalesEmployee, editSalesEmployee, getSalesEmployee, getSalesEmployees } from "../services/SalesEmployeeService";

export const getSalesEmployeeList = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('salesEmployee/list.njk', { salesEmployees: await getSalesEmployees() });
}

export const getSalesEmployeeDetail = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('salesEmployee/detail.njk', { salesEmployee: await getSalesEmployee(req.params.id) });
}

export const getSalesEmployeeDeleteForm = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('salesEmployee/delete.njk', { salesEmployee: await getSalesEmployee(req.params.id) });
}

export const postSalesEmployeeDeleteForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        await deleteSalesEmployee(req.params.id);
        return res.render('salesEmployee/deleteSuccess.njk');
    } catch (e) {
        return res.render('salesEmployee/delete.njk', { salesEmployee: await getSalesEmployee(req.params.id), error: e });
    }
}

export const getSalesEmployeeCreateForm = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('salesEmployee/create.njk');
}

export const postSalesEmployeeCreateForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const salesEmployeeId = await createSalesEmployee(req.body);
        return res.render('salesEmployee/createSuccess.njk', { salesEmployeeId });
    } catch (e) {
        return res.render('salesEmployee/create.njk', { error: e });
    }
}

export const getSalesEmployeeEditForm = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('salesEmployee/edit.njk', { salesEmployee: await getSalesEmployee(req.params.id) });
}

export const postSalesEmployeeEditForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        await editSalesEmployee(req.body, req.params.id);
        return res.render('salesEmployee/editSuccess.njk');
    } catch (e) {
        return res.render('salesEmployee/edit.njk', { salesEmployee: await getSalesEmployee(req.params.id), error: e });
    }
}