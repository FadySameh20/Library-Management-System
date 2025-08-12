import * as booksService from "../services/books.service.js";
import { asyncHandler } from "../exceptions/asyncHandler.js";
import { BadRequestError } from "../exceptions/httpErrors.js";

export const listBooks = asyncHandler(async (req, res) => {
  console.log("GET /api/books");

  const { title, author, isbn } = req.query;
  const booksListResponse = await booksService.getAllBooks({
    title,
    author,
    isbn,
  });
  res.json(booksListResponse);
});

export const createBook = asyncHandler(async (req, res) => {
  console.log("POST /api/books");

  const { title, author, isbn, quantity, shelfLocation } = req.body;

  if (!title || !author || !isbn || quantity === undefined) {
    throw new BadRequestError("Missing required fields: title, author, isbn, quantity");
  }

  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 0) {
    throw new BadRequestError("quantity must be a non-negative integer");
  }

  const created = await booksService.createBook({
    title,
    author,
    isbn,
    quantity,
    shelfLocation,
  });
  res.status(201).json(created);
});

export const updateBook = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  console.log(`PUT /api/books/${id}`);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("Invalid id");
  }

  const { title, author, isbn, quantity, shelfLocation } = req.body;

  if (quantity !== undefined) {
    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 0) {
      throw new BadRequestError("quantity must be a non-negative integer");
    }
  }

  const updated = await booksService.updateBook(id, {
    title,
    author,
    isbn,
    quantity,
    shelfLocation,
  });
  res.json(updated);
});

export const deleteBook = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  console.log(`DELETE /api/books/${id}`);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("Invalid id");
  }

  await booksService.deleteBook(id);
  res.status(204).send();
});
