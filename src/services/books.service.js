import prisma from "../prisma/client.js";
import { getTotalPages } from "../utils/pageHandler.js";

export const getAllBooks = async (filters = {}, pagination = {}) => {
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

  const total = await prisma.book.count({ where: whereClause });
  const data = await prisma.book.findMany({
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

export const createBook = async (bookData) => {
  const { title, author, isbn, quantity, shelfLocation } = bookData;
  return await prisma.book.create({
    data: {
      title,
      author,
      isbn,
      quantity,
      shelfLocation: shelfLocation ?? null,
    },
  });
};

export const updateBook = async (id, updates) => {
  const data = Object.fromEntries(
    Object.entries(updates).filter(([_, value]) => value !== undefined)
  );

  return await prisma.book.update({
    where: { id },
    data,
  });
};

export const deleteBook = async (id) => {
  return await prisma.book.delete({ where: { id } });
};
