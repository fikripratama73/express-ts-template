import type { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";
import { zodError } from "../utils/zodify.util";

export const validate =
    (schema: ZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = schema.parse(req.body);
                next();
            } catch (err) {
                if (err instanceof ZodError) {
                    return res.status(400).json({
                        errors: zodError(err),
                    });
                }
                next(err);
            }
        };
