/*
  Warnings:

  - Made the column `order` on table `item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "item" ALTER COLUMN "order" SET NOT NULL;
