/*
  Warnings:

  - You are about to drop the column `nameHash` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `nameHash` on the `debts` table. All the data in the column will be lost.
  - You are about to drop the column `nameHash` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the column `nameHash` on the `incomes` table. All the data in the column will be lost.
  - You are about to drop the column `nameHash` on the `investments` table. All the data in the column will be lost.
  - You are about to drop the column `nameHash` on the `lends` table. All the data in the column will be lost.
  - You are about to drop the column `nameHash` on the `notifiers` table. All the data in the column will be lost.
  - You are about to drop the column `nameHash` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `nameHash` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `nameHash` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `nameHash` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `nameHash` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `is_active` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Category" ADD VALUE 'SUBSCRIPTION';

-- DropForeignKey
ALTER TABLE "debts" DROP CONSTRAINT "debts_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "lends" DROP CONSTRAINT "lends_profile_id_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "nameHash",
ADD COLUMN     "name_hash" TEXT;

-- AlterTable
ALTER TABLE "debts" DROP COLUMN "nameHash",
ADD COLUMN     "name_hash" TEXT;

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "nameHash",
ADD COLUMN     "name_hash" TEXT;

-- AlterTable
ALTER TABLE "incomes" DROP COLUMN "nameHash",
ADD COLUMN     "name_hash" TEXT;

-- AlterTable
ALTER TABLE "investments" DROP COLUMN "nameHash",
ADD COLUMN     "name_hash" TEXT;

-- AlterTable
ALTER TABLE "lends" DROP COLUMN "nameHash",
ADD COLUMN     "name_hash" TEXT;

-- AlterTable
ALTER TABLE "notifiers" DROP COLUMN "nameHash",
ADD COLUMN     "name_hash" TEXT;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "nameHash",
ADD COLUMN     "name_hash" TEXT;

-- AlterTable
ALTER TABLE "reports" DROP COLUMN "nameHash",
ADD COLUMN     "name_hash" TEXT;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "nameHash",
ADD COLUMN     "is_active" BOOLEAN NOT NULL,
ADD COLUMN     "name_hash" TEXT;

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "nameHash",
ADD COLUMN     "name_hash" TEXT;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "nameHash",
ADD COLUMN     "name_hash" TEXT;

-- AddForeignKey
ALTER TABLE "lends" ADD CONSTRAINT "lends_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debts" ADD CONSTRAINT "debts_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
