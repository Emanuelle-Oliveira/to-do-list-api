/*
  Warnings:

  - Made the column `order` on table `list` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "list" ALTER COLUMN "order" SET NOT NULL;
