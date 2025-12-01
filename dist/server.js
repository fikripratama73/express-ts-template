import express from "express";
import cors from "cors";
import helmet from "helmet";
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
