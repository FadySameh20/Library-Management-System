import * as borrowingsService from "../services/borrowings.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  validateId,
  isEmpty,
  isPositiveInteger,
} from "../utils/validators.js";
import { BadRequestError } from "../exceptions/httpErrors.js";
import { getPageInfo } from "../utils/pageHandler.js";

export const checkoutBook = asyncHandler(async (req, res) => {
  const { borrowerId, bookId, days } = req.body;
  console.log(`POST /api/borrowings/checkoutBook`);

  validateId(borrowerId, "Borrower ID");
  validateId(bookId, "Book ID");

  if(!isEmpty(days) && !isPositiveInteger(days)) {
    throw new BadRequestError(`Loan days must be a positive integer.`)
  }

  const loan = await borrowingsService.checkoutBookForBorrower(
    borrowerId,
    bookId,
    days
  );
  res.status(201).json(loan);
});

export const returnBook = asyncHandler(async (req, res) => {
  const { borrowerId, bookId } = req.body;
  console.log(`POST /api/borrowings/returnBook`);

  validateId(borrowerId, "Borrower ID");
  validateId(bookId, "Book ID");

  const loan = await borrowingsService.returnBookForBorrower(
    borrowerId,
    bookId
  );
  res.json(loan);
});

export const listOverdueLoans = asyncHandler(async (req, res) => {
  console.log("GET /api/borrowings/overdue");
  const loans = await borrowingsService.getOverdueLoans(getPageInfo(req));
  res.json(loans);
});
