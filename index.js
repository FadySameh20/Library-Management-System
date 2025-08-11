import express, { json } from "express";

const app = express();
const port = 3000;

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
