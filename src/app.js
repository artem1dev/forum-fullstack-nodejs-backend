import express from "express";
import compression from "compression";
import helmet from "helmet";
import xss from "xss-clean";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import "dotenv/config";

import { apiLimiter, errorHandler } from "./middlewares/index.js";
import AppRouter from "./routes/index.js";
import { connectToDB } from "./database/db.js";

// CORS configuration
const corsOptions = {
    origin:"*",
    credentials: true,
    optionSuccessStatus: 200,
};

connectToDB();
const app = express(); // Create a new Express application
const appRouter = new AppRouter(app);

// Middleware configuration
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(xss());

// Rate limiting middleware for API routes (in production)
if (process.env.NODE_ENV === "production") {
    app.use("/api", apiLimiter);
}

// Set the port for the application
app.set("port", process.env.PORT || 8080);

// Enable Cross-Origin Resource Sharing with specified options
app.use(cors(corsOptions));

// Body parser configuration
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "1000mb" }));

// Global error handler middleware
app.use(errorHandler);
appRouter.init();

export default app;