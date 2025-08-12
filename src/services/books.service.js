import prisma from "../prisma/client.js";

export const getAllBooks = async (filters = {}) => {
  const where = Object.fromEntries(
    Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key, value]) => [
        key,
        { contains: value, mode: "insensitive" }
      ])
  );

  return prisma.book.findMany({
    where: Object.keys(where).length ? { AND: [where] } : undefined,
  });
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
