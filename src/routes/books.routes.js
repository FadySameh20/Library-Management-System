import { Router } from "express";
import { listBooks, createBook, updateBook, deleteBook } from "../controllers/books.controller.js";

const bookRoutes = Router();

bookRoutes.get("/", listBooks);
bookRoutes.post("/", createBook);
bookRoutes.put("/:id", updateBook);
bookRoutes.delete("/:id", deleteBook);

export default bookRoutes;
