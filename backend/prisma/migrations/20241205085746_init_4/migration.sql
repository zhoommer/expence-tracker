/*
  Warnings:

  - You are about to drop the column `currenct` on the `Expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "currenct",
ADD COLUMN     "currency" "Currency";
