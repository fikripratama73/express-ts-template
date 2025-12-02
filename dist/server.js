import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRouter from "./modules/auth/auth.route.js";
import userRouter from "./modules/users/user.route.js";
const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static('public'));
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.get("/", (_, res) => {
    res.json({ message: "API is running..." });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
