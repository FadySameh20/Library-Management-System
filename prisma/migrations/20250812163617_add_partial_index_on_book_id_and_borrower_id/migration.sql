CREATE UNIQUE INDEX uq_active_borrow
ON "BookBorrower" ("borrowerId", "bookId")
WHERE "returnDate" IS NULL;