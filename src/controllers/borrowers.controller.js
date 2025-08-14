import * as borrowersService from "../services/borrowers.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPageInfo } from "../utils/pageHandler.js";
import { requireFields, validateId } from "../utils/validators.js";

export const listBorrowers = asyncHandler(async (req, res) => {
  console.log("GET /api/borrowers");

  const { name, email } = req.query;

  const borrowers = await borrowersService.getAllBorrowers(
    { name, email },
    getPageInfo(req),
  );
  res.json(borrowers);
});

export const createBorrower = asyncHandler(async (req, res) => {
  console.log("POST /api/borrowers");

  const { name, email } = req.body;
  requireFields(req.body, ["name", "email"]);

  const created = await borrowersService.createBorrower({ name, email });
  res.status(201).json(created);
});

export const updateBorrower = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  console.log(`PUT /api/borrowers/${id}`);

  validateId(id);
  const { name, email } = req.body;
  
  const updated = await borrowersService.updateBorrower(id, { name, email });
  res.json(updated);
});

export const deleteBorrower = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  console.log(`DELETE /api/borrowers/${id}`);

  validateId(id);

  await borrowersService.deleteBorrower(id);
  res.status(204).send();
});

export const getBorrowerActiveLoans = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  console.log(`GET /api/borrowers/${id}/loans/active`);

  validateId(id);

  const loans = await borrowersService.getBorrowerActiveLoans(id);
  res.json(loans);
});
