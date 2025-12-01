import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRouter from "./modules/auth/auth.route";

dotenv.config();
const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static('public'));

app.use("/api/auth", authRouter);

app.get("/", (_, res) => {
  res.json({ message: "API is running..." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
