import * as booksService from "../services/books.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BadRequestError } from "../exceptions/httpErrors.js";
import {
  requireFields,
  isNegativeInteger,
  validateId,
  isEmpty,
} from "../utils/validators.js";
import { getPageInfo } from "../utils/pageHandler.js";

export const listBooks = asyncHandler(async (req, res) => {
  console.log("GET /api/books");

  const { title, author, isbn } = req.query;

  const booksListResponse = await booksService.getAllBooks(
    { title, author, isbn },
    getPageInfo(req),
  );
  res.json(booksListResponse);
});

export const createBook = asyncHandler(async (req, res) => {
  console.log("POST /api/books");

  const { title, author, isbn, quantity, shelfLocation } = req.body;

  requireFields(req.body, ["title", "author", "isbn", "quantity"]);
  
  if(isNegativeInteger(quantity)) {
    throwNegativeQuantityError();
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
  
  validateId(id);
  const { title, author, isbn, quantity, shelfLocation } = req.body;

  if (!isEmpty(quantity) && isNegativeInteger(quantity)) {
    throwNegativeQuantityError();
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
  
  validateId(id);

  await booksService.deleteBook(id);
  res.status(204).send();
});


const throwNegativeQuantityError = () => {
  throw new BadRequestError(`Quantity must be greater than or equal to 0.`); 
}
