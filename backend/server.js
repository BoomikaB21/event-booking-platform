import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

