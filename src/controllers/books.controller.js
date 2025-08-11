import * as booksService from "../services/books.service.js";

export const listBooks = async (req, res) => {
  try {
    const booksListResponse = await booksService.getAllBooks();
    res.json(booksListResponse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};
