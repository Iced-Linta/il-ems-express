import express from "express";
import { doCheckMfa, doIssueMfa, doRegister, getToken } from "../services/AuthService";
import { JwtToken } from "../models/JwtToken";
import { jwtDecode } from "jwt-decode";

export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('auth/login.njk');
}

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        if (req.body.mfaCode) {
            if (!req.body.mfaSid) return res.render('auth/mfa.njk', { errormessage: "A server error has occurred. Please try again." });
            try {
                await doCheckMfa({ sid: req.body.mfaSid, code: req.body.mfaCode });
                return res.redirect('/sales-employees');
            } catch (e) {
                return res.render('auth/mfa.njk', { errormessage: "Invalid OTP code." });
            }
        }

        req.session.token = await getToken(req.body);
        
        const decodedToken: JwtToken = jwtDecode(req.session.token);

        if (!decodedToken.User.phone) return res.redirect('/sales-employees');

        const mfaSid = await doIssueMfa({ phone: decodedToken.User.phone });
        return res.render('auth/mfa.njk', { mfaSid });
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