import { AuthService } from "./auth.service.js";
import { setCookie, deleteCookie } from "../../lib/cookies.js";
import { sendError } from "../../utils/response.util.js";
export class AuthController {
    static async register(req, res) {
        try {
            const { user } = await AuthService.registerService(req.body);
            return res.status(201).json({
                message: "Registration successful",
                user,
            });
        }
        catch (err) {
            return res.status(400).json(sendError(err.message, err));
        }
    }
    static async login(req, res) {
        try {
            const { token, user } = await AuthService.loginService(req.body);
            setCookie(req, res, "accessToken", token);
            return res.status(200).json({
                message: "Login successful",
                user,
            });
        }
        catch (err) {
            return res.status(400).json(sendError(err.message, err));
        }
    }
    static async logout(req, res) {
        deleteCookie(req, res, "accessToken");
        return res.json({ message: "Logged out successfully" });
    }
}
