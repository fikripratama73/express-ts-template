import { sendError } from "../utils/response.util";
import { verifyToken } from "../lib/jwt";
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
        return res.status(401).json(sendError("Authorization header missing"));
    const token = authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json(sendError("Token missing"));
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(403).json(sendError("Invalid or expired token"));
    }
};
