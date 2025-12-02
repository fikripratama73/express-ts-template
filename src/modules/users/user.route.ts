import { Router } from "express";
import { authGuard } from "../../middlewares/auth.middleware.js";
import { UserController } from "./user.controller.js";

const userRouter = Router();

userRouter.get("/", authGuard, UserController.getAll);
userRouter.get("/:id", authGuard, UserController.getById);

export default userRouter;
