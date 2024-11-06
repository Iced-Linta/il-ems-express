import express from "express";
import { getSalesEmployee } from "../services/SalesEmployeeService";

export const checkSalesEmployeeExists = () => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const salesEmployee = await getSalesEmployee(req.params.id);
        if (!salesEmployee) return res.render('errors/404.njk');

        next();
    }
}