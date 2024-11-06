import express from "express";
import { createSalesEmployee, deleteSalesEmployee, editSalesEmployee, getSalesEmployee, getSalesEmployees } from "../services/SalesEmployeeService";

export const getAllSalesEmployees = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('salesEmployee/list.njk', { salesEmployees: await getSalesEmployees() });
}

export const getSingleSalesEmployee = async (req: express.Request, res: express.Response): Promise<void> => {
    const salesEmployee = await getSalesEmployee(req.params.id);
    if (!salesEmployee) return res.render('errors/404.njk');
    return res.render('salesEmployee/detail.njk', { salesEmployee });
}

export const getSingleSalesEmployeeToDelete = async (req: express.Request, res: express.Response): Promise<void> => {
    const salesEmployee = await getSalesEmployee(req.params.id);
    if (!salesEmployee) return res.render('errors/404.njk');
    return res.render('salesEmployee/delete.njk', { salesEmployee });
}

export const deleteSingleSalesEmployee = async (req: express.Request, res: express.Response): Promise<void> => {
    const salesEmployee = await getSalesEmployee(req.params.id);
    try {
        await deleteSalesEmployee(req.params.id);
        return res.render('salesEmployee/deleteSuccess.njk');
    } catch (e) {
        return res.render('salesEmployee/delete.njk', { salesEmployee, error: e });
    }
}

export const getCreateSingleSalesEmployee = async (req: express.Request, res: express.Response): Promise<void> => {
    return res.render('salesEmployee/create.njk');
}

export const postCreateSingleSalesEmployee = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const salesEmployeeId = await createSalesEmployee(req.body);
        return res.render('salesEmployee/createSuccess.njk', { salesEmployeeId });
    } catch (e) {
        return res.render('salesEmployee/create.njk', { error: e });
    }
}

export const getSingleSalesEmployeeToEdit = async (req: express.Request, res: express.Response): Promise<void> => {
    const salesEmployee = await getSalesEmployee(req.params.id);
    if (!salesEmployee) return res.render('errors/404.njk');
    return res.render('salesEmployee/edit.njk', { salesEmployee });
}

export const postEditSingleSalesEmployee = async (req: express.Request, res: express.Response): Promise<void> => {
    const salesEmployee = await getSalesEmployee(req.params.id);
    try {
        await editSalesEmployee(req.body, req.params.id);
        return res.render('salesEmployee/editSuccess.njk');
    } catch (e) {
        return res.render('salesEmployee/edit.njk', { salesEmployee, error: e });
    }
}