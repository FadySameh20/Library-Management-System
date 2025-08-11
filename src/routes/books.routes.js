import { Router } from "express";
import { listBooks } from "../controllers/books.controller.js";

const bookRoutes = Router();

bookRoutes.get("/", listBooks);

export default bookRoutes;
