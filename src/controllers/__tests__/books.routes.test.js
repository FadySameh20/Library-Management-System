import { describe, it, expect, beforeEach, vi } from "vitest";
import request from "supertest";

// Mock books service
vi.mock("../../services/books.service.js", () => {
  return {
    getAllBooks: vi.fn(),
    createBook: vi.fn(),
    updateBook: vi.fn(),
    deleteBook: vi.fn(),
  };
});

describe("Books CRUD operations", () => {
  /** @type {import('express').Express} */
  let app;
  let services;

  beforeEach(async () => {
    vi.resetModules();
    services = await import("../../services/books.service.js");
    const mod = await import("../../app.js");
    app = mod.default;
  });

  it("GET /api/books returns data and meta from service", async () => {
    services.getAllBooks.mockResolvedValue({
      data: [],
      meta: { total: 0, page: 1, pageSize: 10, totalPages: 0 },
    });
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: [],
      meta: { total: 0, page: 1, pageSize: 10, totalPages: 0 },
    });
    expect(services.getAllBooks).toHaveBeenCalledTimes(1);
  });

  it("POST /api/books validates required fields", async () => {
    const res = await request(app)
      .post("/api/books")
      .send({ title: "Only title" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Missing required fields/);
  });

  it("POST /api/books rejects negative quantity", async () => {
    const res = await request(app)
      .post("/api/books")
      .send({ title: "T", author: "A", isbn: "I", quantity: -1 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Quantity must be greater than or equal to 0.");
  });

  it("POST /api/books returns 409 if books with same isbn is present (prisma will will return error code P2002)", async () => {
    services.createBook.mockRejectedValue({ code: "P2002" });
    const res = await request(app)
      .post("/api/books")
      .send({ title: "T", author: "A", isbn: "I", quantity: 1 });
    expect(res.status).toBe(409);
    expect(res.body).toEqual({ error: "Resource already exists" });
  });

  it("PUT /api/books/:id validates id", async () => {
    const res = await request(app)
      .put("/api/books/not-a-number")
      .send({ title: "X" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Invalid ID/);
  });

  it("PUT /api/books/:id rejects negative quantity when provided", async () => {
    const res = await request(app)
      .put("/api/books/1")
      .send({ quantity: -5 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Quantity must be greater than or equal to 0.");
  });

  it("PUT /api/books/:id returns updated entity on success", async () => {
    services.updateBook.mockResolvedValue({ id: 1, title: "Updated" });
    const res = await request(app)
      .put("/api/books/1")
      .send({ title: "Updated" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: "Book updated successfully",
      data: { id: 1, title: "Updated" },
    });
  });

  it("PUT /api/books/:id returns 404 if book is not found", async () => {
    services.updateBook.mockRejectedValue({ code: "P2025" });
    const res = await request(app)
      .put("/api/books/1")
      .send({ title: "Updated" });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Resource not found" });
  });

  it("DELETE /api/books/:id validates id", async () => {
    const res = await request(app).delete("/api/books/0");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Invalid ID/);
  });

  it("DELETE /api/books/:id returns 200 with message and data on success", async () => {
    services.deleteBook.mockResolvedValue({ id: 2 });
    const res = await request(app).delete("/api/books/2");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: "Book deleted successfully",
      data: { id: 2 },
    });
  });

  it("DELETE /api/books/:id returns 404 if books is not found", async () => {
    services.deleteBook.mockRejectedValue({ code: "P2025" });
    const res = await request(app).delete("/api/books/2");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Resource not found" });
  });
});
