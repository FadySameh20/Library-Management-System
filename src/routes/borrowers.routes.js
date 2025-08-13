import { Router } from "express";
import { listBorrowers, createBorrower, updateBorrower, deleteBorrower } from "../controllers/borrowers.controller.js";

const borrowerRoutes = Router();

borrowerRoutes.get("/", listBorrowers);
borrowerRoutes.post("/", createBorrower);
borrowerRoutes.put("/:id", updateBorrower);
borrowerRoutes.delete("/:id", deleteBorrower);

export default borrowerRoutes;


