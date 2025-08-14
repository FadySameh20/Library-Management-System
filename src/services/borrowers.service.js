import prisma from "../prisma/client.js";
import { getTotalPages } from "../utils/pageHandler.js";

export const getAllBorrowers = async (filters = {}, pagination = {}) => {
  const { page, pageSize } = pagination;

  const where = Object.fromEntries(
    Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key, value]) => [
        key,
        { contains: value, mode: "insensitive" }
      ])
  );

  const whereClause = Object.keys(where).length ? { AND: [where] } : undefined;

  const total = await prisma.borrower.count({ where: whereClause });
  const data = await prisma.borrower.findMany({
    where: whereClause,
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

export const createBorrower = async (borrowerData) => {
  const { name, email } = borrowerData;
  return await prisma.borrower.create({
    data: {
      name,
      email,
    },
  });
};

export const updateBorrower = async (id, updates) => {
  const data = Object.fromEntries(
    Object.entries(updates).filter(([_, value]) => value !== undefined)
  );

  return await prisma.borrower.update({
    where: { id },
    data,
  });
};

export const deleteBorrower = async (id) => {
  return await prisma.borrower.delete({ where: { id } });
};

export const getBorrowerActiveLoans = async (borrowerId, pagination = {}) => {
  const { page, pageSize } = pagination;

  const where = { borrowerId, returnDate: null };

  const total = await prisma.bookBorrower.count({ where });
  const data = await prisma.bookBorrower.findMany({
    where,
    orderBy: { dueDate: "asc" },
    include: { book: true },
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
