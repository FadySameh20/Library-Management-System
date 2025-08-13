import prisma from "../prisma/client.js";

export const getAllBorrowers = async (filters = {}) => {
  const where = Object.fromEntries(
    Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key, value]) => [
        key,
        { contains: value, mode: "insensitive" }
      ])
  );

  return prisma.borrower.findMany({
    where: Object.keys(where).length ? { AND: [where] } : undefined,
  });
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


