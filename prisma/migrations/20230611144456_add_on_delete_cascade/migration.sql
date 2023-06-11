-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_listId_fkey";

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "FK_Item_List" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
