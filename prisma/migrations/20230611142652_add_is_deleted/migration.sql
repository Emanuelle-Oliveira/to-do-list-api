-- AlterTable
ALTER TABLE "item" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "list" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
