-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('TRY', 'USD');

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "currenct" "Currency";
