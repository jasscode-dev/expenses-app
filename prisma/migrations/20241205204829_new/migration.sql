/*
  Warnings:

  - You are about to drop the `cards` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "DebtType" AS ENUM ('CREDIT_CARD', 'BOLETO', 'PERSONAL_LOAN', 'OTHER');

-- CreateEnum
CREATE TYPE "DebtStatus" AS ENUM ('PAID', 'UNPAID');

-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_userId_fkey";

-- DropForeignKey
ALTER TABLE "trasactions" DROP CONSTRAINT "trasactions_cardId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "cards";

-- CreateTable
CREATE TABLE "debts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DebtType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "DebtStatus" NOT NULL DEFAULT 'UNPAID',
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "debts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "debts" ADD CONSTRAINT "debts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
