import { ZodError } from "zod";
import { zodError } from "../utils/zodify.util.js";
export const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                errors: zodError(err),
            });
        }
        next(err);
    }
};
