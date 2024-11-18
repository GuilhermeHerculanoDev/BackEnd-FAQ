-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_category_id_fkey";

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
