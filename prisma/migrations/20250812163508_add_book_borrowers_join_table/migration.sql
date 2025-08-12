-- CreateTable
CREATE TABLE "public"."BookBorrower" (
    "id" SERIAL NOT NULL,
    "borrowerId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "checkoutDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3),

    CONSTRAINT "BookBorrower_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."BookBorrower" ADD CONSTRAINT "BookBorrower_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "public"."Borrower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookBorrower" ADD CONSTRAINT "BookBorrower_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
