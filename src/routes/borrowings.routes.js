import { Router } from "express";
import { checkoutBook, returnBook, listOverdueLoans } from "../controllers/borrowings.controller.js";

const borrowingsRoutes = Router();

borrowingsRoutes.post("/checkoutBook", checkoutBook);
borrowingsRoutes.post("/returnBook", returnBook);
borrowingsRoutes.get("/overdue", listOverdueLoans);

export default borrowingsRoutes;
