/*
  Warnings:

  - The values [expense,income] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `payMethod` on the `users` table. All the data in the column will be lost.
  - Added the required column `name` to the `trasactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('expenses', 'incomes');
ALTER TABLE "trasactions" ALTER COLUMN "type" TYPE "TransactionType_new" USING ("type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "trasactions" ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "payMethod" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "payMethod";

-- DropEnum
DROP TYPE "PayMethodType";
