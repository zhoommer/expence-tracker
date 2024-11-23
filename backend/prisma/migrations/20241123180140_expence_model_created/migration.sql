-- CreateTable
CREATE TABLE "Expence" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Expence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenceCategories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "spendingLimit" DOUBLE PRECISION,
    "userId" TEXT,

    CONSTRAINT "ExpenceCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expence" ADD CONSTRAINT "Expence_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ExpenceCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenceCategories" ADD CONSTRAINT "ExpenceCategories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
