import express from "express";
import { doRegister, getToken } from "../services/AuthService";

export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('auth/login.njk');
}

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        req.session.token = await getToken(req.body);
        res.redirect('/sales-employees');
    } catch (e) {
        res.locals.errormessage = `Login error: ${e.message}`;
        res.render('auth/login.njk', req.body);
    }
}

export const getRegisterForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('auth/register.njk');
}

export const postRegisterForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const user = await doRegister(req.body);
        res.render('auth/registerSuccess.njk', { user });
    } catch (e) {
        res.locals.errormessage = `Registration error: ${e.message}`;
        res.render('auth/register.njk', req.body);
    }
}