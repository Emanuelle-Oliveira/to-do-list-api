/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_listId_fkey";

-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "titleItem" VARCHAR(250) NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "finalDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "order" INTEGER,
    "listId" INTEGER,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE SET NULL ON UPDATE CASCADE;
