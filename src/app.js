import express from "express";
import bookRoutes from "./routes/books.routes.js";
import { errorMiddleware } from "./exceptions/errorMiddleware.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api/books", bookRoutes);

// Centralized error handler (must be last)
app.use(errorMiddleware);

export default app;
