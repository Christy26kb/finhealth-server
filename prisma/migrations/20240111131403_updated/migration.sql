/*
  Warnings:

  - You are about to drop the column `module_type` on the `categories` table. All the data in the column will be lost.
  - Added the required column `type` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryTypes" AS ENUM ('INCOMES', 'EXPENSES', 'INVESTMENTS', 'SUBSCRIPTIONS', 'DEBTS', 'LENDS', 'REPORTS');

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "module_type",
ADD COLUMN     "type" "CategoryTypes" NOT NULL;

-- DropEnum
DROP TYPE "Modules";
