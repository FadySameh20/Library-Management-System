import { Router } from "express";
import { listBorrowers, createBorrower, updateBorrower, deleteBorrower, getBorrowerActiveLoans } from "../controllers/borrowers.controller.js";

const borrowerRoutes = Router();

borrowerRoutes.get("/", listBorrowers);
borrowerRoutes.post("/", createBorrower);
borrowerRoutes.put("/:id", updateBorrower);
borrowerRoutes.delete("/:id", deleteBorrower);
borrowerRoutes.get("/:id/loans/active", getBorrowerActiveLoans);

export default borrowerRoutes;


