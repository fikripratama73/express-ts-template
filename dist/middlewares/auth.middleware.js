import { getCookie } from "../lib/cookies.js";
import { verifyToken } from "../lib/jwt.js";
export function authGuard(req, res, next) {
    try {
        const token = getCookie(req, res, "accessToken");
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });
        const payload = verifyToken(token);
        req.user = payload;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
