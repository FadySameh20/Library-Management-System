import prisma from "../prisma/client.js";

export const getAllBooks = async () => {
  return await prisma.book.findMany();
};
