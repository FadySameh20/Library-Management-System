const openapi = {
  openapi: "3.0.3",
  info: {
    title: "Library Management System API",
    version: "1.0.0",
    description:
      "REST API for managing books, borrowers, and borrowings. Uses Prisma ORM and Express.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  tags: [
    { name: "Books" },
    { name: "Borrowers" },
    { name: "Borrowings" },
  ],
  paths: {
    "/api/books": {
      get: {
        tags: ["Books"],
        summary: "List books",
        description: "List all books with optional search filters and pagination.",
        parameters: [
          { in: "query", name: "title", schema: { type: "string" }, description: "Filter by title (contains, case-insensitive)" },
          { in: "query", name: "author", schema: { type: "string" }, description: "Filter by author (contains, case-insensitive)" },
          { in: "query", name: "isbn", schema: { type: "string" }, description: "Filter by ISBN (contains, case-insensitive)" },
          { in: "query", name: "page", schema: { type: "integer", minimum: 1, default: 1 }, description: "Page number (1-based)" },
          { in: "query", name: "pageSize", schema: { type: "integer", minimum: 1, default: 10 }, description: "Items per page" },
        ],
        responses: {
          200: {
            description: "Paginated list of books",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["data", "meta"],
                  properties: {
                    data: { type: "array", items: { $ref: "#/components/schemas/Book" } },
                    meta: { $ref: "#/components/schemas/PaginationMeta" },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/InternalServerError" },
        },
      },
      post: {
        tags: ["Books"],
        summary: "Create a book",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "author", "isbn", "quantity"],
                properties: {
                  title: { type: "string", example: "Clean Code" },
                  author: { type: "string", example: "Robert C. Martin" },
                  isbn: { type: "string", example: "9780132350884" },
                  quantity: { type: "integer", minimum: 0, example: 5 },
                  shelfLocation: { type: "string", nullable: true, example: "A3-12" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created book",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["message", "data"],
                  properties: {
                    message: { type: "string", example: "Book created successfully" },
                    data: { $ref: "#/components/schemas/Book" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          409: { $ref: "#/components/responses/Conflict" },
          500: { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/books/{id}": {
      put: {
        tags: ["Books"],
        summary: "Update a book",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  author: { type: "string" },
                  isbn: { type: "string" },
                  quantity: { type: "integer", minimum: 0 },
                  shelfLocation: { type: "string", nullable: true },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Updated book",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["message", "data"],
                  properties: {
                    message: { type: "string", example: "Book updated successfully" },
                    data: { $ref: "#/components/schemas/Book" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          404: { $ref: "#/components/responses/NotFound" },
          409: { $ref: "#/components/responses/Conflict" },
          500: { $ref: "#/components/responses/InternalServerError" },
        },
      },
      delete: {
        tags: ["Books"],
        summary: "Delete a book",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "integer" } },
        ],
        responses: {
          200: {
            description: "Deleted book",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["message", "data"],
                  properties: {
                    message: { type: "string", example: "Book deleted successfully" },
                    data: { $ref: "#/components/schemas/Book" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/borrowers": {
      get: {
        tags: ["Borrowers"],
        summary: "List borrowers",
        parameters: [
          { in: "query", name: "name", schema: { type: "string" }, description: "Filter by name (contains, case-insensitive)" },
          { in: "query", name: "email", schema: { type: "string" }, description: "Filter by email (contains, case-insensitive)" },
          { in: "query", name: "page", schema: { type: "integer", minimum: 1, default: 1 }, description: "Page number (1-based)" },
          { in: "query", name: "pageSize", schema: { type: "integer", minimum: 1, default: 10 }, description: "Items per page" },
        ],
        responses: {
          200: {
            description: "Paginated list of borrowers",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["data", "meta"],
                  properties: {
                    data: { type: "array", items: { $ref: "#/components/schemas/Borrower" } },
                    meta: { $ref: "#/components/schemas/PaginationMeta" },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/InternalServerError" },
        },
      },
      post: {
        tags: ["Borrowers"],
        summary: "Create a borrower",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email"],
                properties: {
                  name: { type: "string", example: "Jane Doe" },
                  email: { type: "string", format: "email", example: "jane@example.com" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created borrower",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["message", "data"],
                  properties: {
                    message: { type: "string", example: "Borrower created successfully" },
                    data: { $ref: "#/components/schemas/Borrower" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          409: { $ref: "#/components/responses/Conflict" },
          500: { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/borrowers/{id}": {
      put: {
        tags: ["Borrowers"],
        summary: "Update a borrower",
        parameters: [ { in: "path", name: "id", required: true, schema: { type: "integer" } } ],
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Updated borrower",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["message", "data"],
                  properties: {
                    message: { type: "string", example: "Borrower updated successfully" },
                    data: { $ref: "#/components/schemas/Borrower" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          404: { $ref: "#/components/responses/NotFound" },
          409: { $ref: "#/components/responses/Conflict" },
          500: { $ref: "#/components/responses/InternalServerError" },
        },
      },
      delete: {
        tags: ["Borrowers"],
        summary: "Delete a borrower",
        parameters: [ { in: "path", name: "id", required: true, schema: { type: "integer" } } ],
        responses: {
          200: {
            description: "Deleted borrower",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["message", "data"],
                  properties: {
                    message: { type: "string", example: "Borrower deleted successfully" },
                    data: { $ref: "#/components/schemas/Borrower" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/borrowers/{id}/loans/active": {
      get: {
        tags: ["Borrowers"],
        summary: "List active loans for a borrower",
        parameters: [ { in: "path", name: "id", required: true, schema: { type: "integer" } } ],
        responses: {
          200: { description: "Array of active loans", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/LoanWithBook" } } } } },
          400: { $ref: "#/components/responses/BadRequest" },
          500: { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/borrowings/checkoutBook": {
      post: {
        tags: ["Borrowings"],
        summary: "Checkout a book",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["borrowerId", "bookId"],
                properties: {
                  borrowerId: { type: "integer", example: 1 },
                  bookId: { type: "integer", example: 1 },
                  days: { type: "integer", minimum: 1, example: 14, description: "Loan duration in days (default 14)" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created loan",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["message", "data"],
                  properties: {
                    message: { type: "string", example: "Book checked out successfully" },
                    data: { $ref: "#/components/schemas/LoanWithBook" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/borrowings/returnBook": {
      post: {
        tags: ["Borrowings"],
        summary: "Return a book",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["borrowerId", "bookId"],
                properties: {
                  borrowerId: { type: "integer", example: 1 },
                  bookId: { type: "integer", example: 1 },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Updated loan",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["message", "data"],
                  properties: {
                    message: { type: "string", example: "Book returned successfully" },
                    data: { $ref: "#/components/schemas/LoanWithBook" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          500: { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/borrowings/overdue": {
      get: {
        tags: ["Borrowings"],
        summary: "List overdue loans",
        parameters: [
          { in: "query", name: "page", schema: { type: "integer", minimum: 1, default: 1 }, description: "Page number (1-based)" },
          { in: "query", name: "pageSize", schema: { type: "integer", minimum: 1, default: 10 }, description: "Items per page" },
        ],
        responses: {
          200: {
            description: "Paginated list of overdue loans",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["data", "meta"],
                  properties: {
                    data: { type: "array", items: { $ref: "#/components/schemas/LoanWithBookAndBorrower" } },
                    meta: { $ref: "#/components/schemas/PaginationMeta" },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
  },
  components: {
    schemas: {
      PaginationMeta: {
        type: "object",
        properties: {
          total: { type: "integer", example: 42 },
          page: { type: "integer", example: 1 },
          pageSize: { type: "integer", example: 10 },
          totalPages: { type: "integer", example: 5 },
        },
        required: ["total", "page", "pageSize", "totalPages"],
      },
      Book: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          title: { type: "string", example: "Clean Code" },
          author: { type: "string", example: "Robert C. Martin" },
          isbn: { type: "string", example: "9780132350884" },
          quantity: { type: "integer", example: 5 },
          shelfLocation: { type: "string", nullable: true, example: "A3-12" },
        },
        required: ["id", "title", "author", "isbn", "quantity"],
      },
      Borrower: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Jane Doe" },
          email: { type: "string", format: "email", example: "jane@example.com" },
          registeredDate: { type: "string", format: "date-time" },
        },
        required: ["id", "name", "email", "registeredDate"],
      },
      Loan: {
        type: "object",
        properties: {
          id: { type: "integer", example: 10 },
          borrowerId: { type: "integer", example: 1 },
          bookId: { type: "integer", example: 2 },
          checkoutDate: { type: "string", format: "date-time" },
          dueDate: { type: "string", format: "date-time" },
          returnDate: { type: "string", format: "date-time", nullable: true },
        },
        required: ["id", "borrowerId", "bookId", "checkoutDate", "dueDate"],
      },
      LoanWithBook: {
        allOf: [
          { $ref: "#/components/schemas/Loan" },
          {
            type: "object",
            properties: { book: { $ref: "#/components/schemas/Book" } },
          },
        ],
      },
      LoanWithBookAndBorrower: {
        allOf: [
          { $ref: "#/components/schemas/LoanWithBook" },
          {
            type: "object",
            properties: { borrower: { $ref: "#/components/schemas/Borrower" } },
          },
        ],
      },
      ErrorResponse: {
        type: "object",
        properties: {
          error: { type: "string" },
          details: { type: "object", additionalProperties: true, nullable: true },
        },
        required: ["error"],
      },
    },
    responses: {
      BadRequest: {
        description: "Bad Request",
        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
      },
      NotFound: {
        description: "Resource not found",
        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
      },
      Conflict: {
        description: "Resource already exists (unique constraint)",
        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
      },
      InternalServerError: {
        description: "Internal Server Error",
        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
      },
    },
  },
};

export default openapi;


