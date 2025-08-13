-- Books search indexes
CREATE INDEX IF NOT EXISTS "Book_title_idx" ON "public"."Book"("title");
CREATE INDEX IF NOT EXISTS "Book_author_idx" ON "public"."Book"("author");

-- Borrowers search indexes
CREATE INDEX IF NOT EXISTS "Borrower_name_idx" ON "public"."Borrower"("name");
CREATE INDEX IF NOT EXISTS "Borrower_email_idx" ON "public"."Borrower"("email");

-- Loan lookups
CREATE INDEX IF NOT EXISTS "BookBorrower_dueDate_returnDate_idx" ON "public"."BookBorrower"("dueDate", "returnDate");
