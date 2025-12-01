import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authGuard } from "../../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", AuthController.logout);

authRouter.get("/me", authGuard, (req, res) => {
    res.json({ user: (req as any).user });
});

export default authRouter;
