import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import express from "express";
import userRouter from "./controllers/userController";
import cors from "cors";


const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

app.use(express.json());

app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

export default app;
