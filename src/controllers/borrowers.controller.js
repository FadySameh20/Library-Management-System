import * as borrowersService from "../services/borrowers.service.js";
import { asyncHandler } from "../exceptions/asyncHandler.js";
import { BadRequestError } from "../exceptions/httpErrors.js";

export const listBorrowers = asyncHandler(async (req, res) => {
  console.log("GET /api/borrowers");

  const { name, email } = req.query;
  const borrowers = await borrowersService.getAllBorrowers({ name, email });
  res.json(borrowers);
});

export const createBorrower = asyncHandler(async (req, res) => {
  console.log("POST /api/borrowers");

  const { name, email } = req.body;

  if (!name || !email) {
    throw new BadRequestError("Missing required fields: name, email");
  }

  const created = await borrowersService.createBorrower({ name, email });
  res.status(201).json(created);
});

export const updateBorrower = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  console.log(`PUT /api/borrowers/${id}`);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("Invalid id");
  }

  const { name, email } = req.body;

  const updated = await borrowersService.updateBorrower(id, { name, email });
  res.json(updated);
});

export const deleteBorrower = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  console.log(`DELETE /api/borrowers/${id}`);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("Invalid id");
  }

  await borrowersService.deleteBorrower(id);
  res.status(204).send();
});


