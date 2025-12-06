import { Request, Response, NextFunction } from "express";
import { getCookie } from "../lib/cookies.js";
import { verifyToken } from "../lib/jwt.js";

export function authGuard(req: Request, res: Response, next: NextFunction) {
  try {
    const token = getCookie(req, res, "accessToken");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = verifyToken(token);
    (req as any).user = payload;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function authorize(...allowedRoles: srtring[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !user.role) return res.status(403).json({ message: "Forbidden: no role detected" });
    if (!allowedRoles.include(user.role)) return res.status(403).json({ message: "Forbidden: insufficient role" });

    next();
  }
}
