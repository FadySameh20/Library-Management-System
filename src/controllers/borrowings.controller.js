import * as borrowingsService from "../services/borrowings.service.js";
import { asyncHandler } from "../exceptions/asyncHandler.js";
import { BadRequestError } from "../exceptions/httpErrors.js";

export const checkoutBook = asyncHandler(async (req, res) => {
  const { borrowerId, bookId, days } = req.body;
  console.log(`POST /api/borrowings/checkoutBook`);

  if (!Number.isInteger(borrowerId)) {
    throw new BadRequestError("Invalid borrower id");
  }
  
  if (!bookId || !Number.isInteger(Number(bookId))) {
    throw new BadRequestError("Missing or invalid field: bookId");
  }
  if (days !== undefined) {
    const numDays = Number(days);
    if (!Number.isInteger(numDays) || numDays <= 0) {
      throw new BadRequestError("days must be a positive integer when provided");
    }
  }

  const loan = await borrowingsService.checkoutBookForBorrower(
    borrowerId,
    Number(bookId),
    days !== undefined ? Number(days) : undefined
  );
  res.status(201).json(loan);
});

export const returnBook = asyncHandler(async (req, res) => {
  const { borrowerId, bookId } = req.body;
  console.log(`POST /api/borrowings/returnBook`);

  if (!Number.isInteger(borrowerId)) {
    throw new BadRequestError("Invalid borrower id");
  }

  if (!bookId || !Number.isInteger(Number(bookId))) {
    throw new BadRequestError("Missing or invalid field: bookId");
  }

  const loan = await borrowingsService.returnBookForBorrower(
    borrowerId,
    Number(bookId)
  );
  res.json(loan);
});

export const listOverdueLoans = asyncHandler(async (_req, res) => {
  console.log("GET /api/borrowings/overdue");
  const loans = await borrowingsService.getOverdueLoans();
  res.json(loans);
});
