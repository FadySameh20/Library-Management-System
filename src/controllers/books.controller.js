import * as booksService from "../services/books.service.js";

export const listBooks = async (req, res) => {
  console.log("GET /api/books");

  try {
    const { title, author, isbn } = req.query;
    const booksListResponse = await booksService.getAllBooks({
      title,
      author,
      isbn,
    });
    
    res.json(booksListResponse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

export const createBook = async (req, res) => {
  console.log("POST /api/books");

  try {
    const { title, author, isbn, quantity, shelfLocation } = req.body;

    if (!title || !author || !isbn || quantity === undefined) {
      return res.status(400).json({
        error: "Missing required fields: title, author, isbn, quantity",
      });
    }

    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({ error: "quantity must be a non-negative integer" });
    }

    const created = await booksService.createBook({
      title,
      author,
      isbn,
      quantity,
      shelfLocation,
    });

    res.status(201).json(created);
  } catch (err) {
    console.log(err);
    if (err?.code === "P2002") {
      return res.status(409).json({ error: "ISBN already exists" });
    }
    res.status(500).json({ error: "Failed to create book" });
  }
};

export const updateBook = async (req, res) => {
  const id = Number(req.params.id);
  console.log(`PUT /api/books/${id}`);

  try {
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const { title, author, isbn, quantity, shelfLocation } = req.body;

    if (quantity !== undefined) {
      if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 0) {
        return res.status(400).json({ error: "quantity must be a non-negative integer" });
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
  } catch (err) {
    console.log(err);
    if (err?.code === "P2002") {
      return res.status(409).json({ error: "ISBN already exists" });
    }
    if (err?.code === "P2025") {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(500).json({ error: "Failed to update book" });
  }
};

export const deleteBook = async (req, res) => {
  const id = Number(req.params.id);
  console.log(`DELETE /api/books/${id}`);

  try {
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    await booksService.deleteBook(id);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    if (err?.code === "P2025") {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(500).json({ error: "Failed to delete book" });
  }
};
