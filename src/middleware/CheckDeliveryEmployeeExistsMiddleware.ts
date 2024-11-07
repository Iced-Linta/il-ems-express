import express from "express";
import { getDeliveryEmployee } from "../services/DeliveryEmployeeService";

export const checkDeliveryEmployeeExists = () => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const deliveryEmployee = await getDeliveryEmployee(req.params.id);
        if (!deliveryEmployee) return res.render('errors/404.njk');

        next();
    }
}