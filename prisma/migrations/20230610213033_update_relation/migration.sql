/*
  Warnings:

  - Made the column `listId` on table `item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_listId_fkey";

-- AlterTable
ALTER TABLE "item" ALTER COLUMN "listId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
