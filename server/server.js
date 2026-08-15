import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import logger from "./middleware/logger.js";
import sessionsRouter from "./routes/sessions.js";
import {
  notFound,
  errorHandler
} from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "SkillTrack API is running"
  });
});

// Sessions routes
app.use("/api/sessions", sessionsRouter);

// 404 handler
app.use(notFound);

// Error handler - must be last
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});