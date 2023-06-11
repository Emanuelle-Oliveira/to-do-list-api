/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "item" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "list" DROP COLUMN "isDeleted";
