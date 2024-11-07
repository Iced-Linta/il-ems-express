import { Request, Response } from "express";
import { createDeliveryEmployee, deleteDeliveryEmployee, editDeliveryEmployee, getDeliveryEmployee, getDeliveryEmployees } from "../services/DeliveryEmployeeService";

export const getDeliveryEmployeeList = async (req: Request, res: Response): Promise<void> => {
    return res.render('deliveryEmployee/list.njk', { deliveryEmployees: await getDeliveryEmployees() });
}

export const getDeliveryEmployeeDetail = async (req: Request, res: Response): Promise<void> => {
    return res.render('deliveryEmployee/detail.njk', { deliveryEmployee: await getDeliveryEmployee(req.params.id) });
}

export const getDeliveryEmployeeDeleteForm = async (req: Request, res: Response): Promise<void> => {
    return res.render('deliveryEmployee/delete.njk', { deliveryEmployee: await getDeliveryEmployee(req.params.id) });
}

export const postDeliveryEmployeeDeleteForm = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteDeliveryEmployee(req.params.id);
        return res.render('deliveryEmployee/deleteSuccess.njk');
    } catch (e) {
        return res.render('deliveryEmployee/delete.njk', { deliveryEmployee: await getDeliveryEmployee(req.params.id), error: e });
    }
}

export const getDeliveryEmployeeCreateForm = async (req: Request, res: Response): Promise<void> => {
    return res.render('deliveryEmployee/create.njk');
}

export const postDeliveryEmployeeCreateForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const deliveryEmployeeId = await createDeliveryEmployee(req.body);
        return res.render('deliveryEmployee/createSuccess.njk', { deliveryEmployeeId });
    } catch (e) {
        return res.render('deliveryEmployee/create.njk', { error: e });
    }
}

export const getDeliveryEmployeeEditForm = async (req: Request, res: Response): Promise<void> => {
    return res.render('deliveryEmployee/edit.njk', { deliveryEmployee: await getDeliveryEmployee(req.params.id) });
}

export const postDeliveryEmployeeEditForm = async (req: Request, res: Response): Promise<void> => {
    try {
        await editDeliveryEmployee(req.body, req.params.id);
        return res.render('deliveryEmployee/editSuccess.njk');
    } catch (e) {
        return res.render('deliveryEmployee/edit.njk', { deliveryEmployee: await getDeliveryEmployee(req.params.id), error: e });
    }
}
