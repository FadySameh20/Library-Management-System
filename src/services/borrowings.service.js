import prisma from "../prisma/client.js";
import { BadRequestError, HttpError } from "../exceptions/httpErrors.js";
import { getTotalPages } from "../utils/pageHandler.js";

export const checkoutBookForBorrower = async (
  borrowerId,
  bookId,
  loanDays = 14
) => {
  const now = new Date();
  const dueDate = new Date(now.getTime() + loanDays * 24 * 60 * 60 * 1000);

  return await prisma.$transaction(async (tx) => {
    const borrower = await tx.borrower.findUnique({ where: { id: borrowerId } });
    if (!borrower) {
      throw new HttpError(404, "Borrower not found");
    }

    const updatedRows = await tx.book.updateMany({
      where: { id: bookId, quantity: { gt: 0 } },
      data: { quantity: { decrement: 1 } },
    });
    if (updatedRows.count === 0) {
      throw new BadRequestError("Book not available or does not exist");
    }

    const loan = await tx.bookBorrower.create({
      data: {
        borrowerId,
        bookId,
        checkoutDate: now,
        dueDate,
      },
      include: { book: true },
    });

    return loan;
  });
};

export const returnBookForBorrower = async (borrowerId, bookId) => {
  const returnDate = new Date();

  return await prisma.$transaction(async (tx) => {
    const activeLoan = await tx.bookBorrower.findFirst({
      where: { borrowerId, bookId, returnDate: null },
    });

    if (!activeLoan) {
      throw new BadRequestError("No active loan found for this borrower and book");
    }

    const updatedLoan = await tx.bookBorrower.update({
      where: { id: activeLoan.id },
      data: { returnDate },
      include: { book: true },
    });

    await tx.book.update({
      where: { id: bookId },
      data: { quantity: { increment: 1 } },
    });

    return updatedLoan;
  });
};

export const getOverdueLoans = async (pagination = {}) => {
  const { page, pageSize } = pagination;
  const now = new Date();

  const where = { dueDate: { lt: now }, returnDate: null };

  const total = await prisma.bookBorrower.count({ where });
  const data = await prisma.bookBorrower.findMany({
    where,
    orderBy: { dueDate: "asc" },
    include: { book: true, borrower: true },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    data,
    meta: {
      total,
      page,
      pageSize,
      totalPages: getTotalPages(total, pageSize),
    },
  };
};
