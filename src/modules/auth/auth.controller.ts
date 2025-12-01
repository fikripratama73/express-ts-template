import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { setCookie, deleteCookie } from "../../lib/cookies";
import { sendError } from "../../utils/response.util";

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const { user } = await AuthService.registerService(req.body);

            return res.status(201).json({
                message: "Registration successful",
                user,
            });
        } catch (err: any) {
            return res.status(400).json(sendError(err.message, err));
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { token, user } = await AuthService.loginService(req.body);

            setCookie(req, res, "accessToken", token);

            return res.status(200).json({
                message: "Login successful",
                user,
            });
        } catch (err: any) {
            return res.status(400).json(sendError(err.message, err));
        }
    }

    static async logout(req: Request, res: Response) {
        deleteCookie(req, res, "accessToken");
        return res.json({ message: "Logged out successfully" });
    }
}
