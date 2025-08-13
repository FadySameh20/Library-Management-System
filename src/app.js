import express from "express";
import bookRoutes from "./routes/books.routes.js";
import borrowerRoutes from "./routes/borrowers.routes.js";
import borrowingsRoutes from "./routes/borrowings.routes.js";
import { errorMiddleware } from "./exceptions/errorMiddleware.js";
import swaggerUi from "swagger-ui-express";
import openapi from "./docs/openapi.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));
app.get("/openapi.json", (_req, res) => res.json(openapi));

app.use("/api/books", bookRoutes);
app.use("/api/borrowers", borrowerRoutes);
app.use("/api/borrowings", borrowingsRoutes);

// Centralized error handler (must be last)
app.use(errorMiddleware);

export default app;
