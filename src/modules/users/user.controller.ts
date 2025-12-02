import type { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/response.util.js";
import { UserService } from "../users/user.service.js";

export class UserController {
    static async getAll(req: Request, res: Response) {
        try {
            const users = await UserService.findAll();
            return res.status(200).json(sendSuccess("Users retrieved successfully", users));
        } catch (error: any) {
            return res.status(500).json(sendError("Failed to retrieve users", error.message));
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserService.findById(id);
            return res.status(200).json(sendSuccess("User retrieved successfully", user));
        } catch (error: any) {
            return res.status(500).json(sendError("Failed to retrieve user", error.message));
        }
    }
}
