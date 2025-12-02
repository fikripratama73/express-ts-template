import { Router } from "express";
import { authGuard } from "../../middlewares/auth.middleware.js";
import { AuthController } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", authGuard, AuthController.logout);

authRouter.get("/me", authGuard, (req, res) => {
    res.json({ user: (req as any).user });
});

export default authRouter;
