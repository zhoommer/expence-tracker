/*
  Warnings:

  - Added the required column `userId` to the `Expence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expence" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Expence" ADD CONSTRAINT "Expence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
