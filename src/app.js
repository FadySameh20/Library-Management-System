import express from "express";
import bookRoutes from "./routes/books.routes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api/books", bookRoutes);

export default app;
