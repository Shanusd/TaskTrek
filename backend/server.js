import express from "express";
import connectDb from "./config/db.js";
import todoRoute from "./routes/todoRoutes.js";
import userRoute from "./routes/userRoutes.js"; // Ensure correct filename
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddelware.js";

dotenv.config();

// Connect to MongoDB
connectDb();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration (Allow frontend access)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/todos", todoRoute);
app.use("/api/user", userRoute);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
