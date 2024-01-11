/*
  Warnings:

  - You are about to drop the column `user_id` on the `notifiers` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "CategoryTypes" ADD VALUE 'NOTIFIERS';

-- DropForeignKey
ALTER TABLE "notifiers" DROP CONSTRAINT "notifiers_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "notifiers" DROP CONSTRAINT "notifiers_user_id_fkey";

-- AlterTable
ALTER TABLE "notifiers" DROP COLUMN "user_id",
ADD COLUMN     "category_id" INTEGER;

-- AddForeignKey
ALTER TABLE "notifiers" ADD CONSTRAINT "notifiers_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifiers" ADD CONSTRAINT "notifiers_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
