/*
  Warnings:

  - You are about to drop the column `category_id` on the `answer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_category_id_fkey";

-- AlterTable
ALTER TABLE "answer" DROP COLUMN "category_id",
ADD COLUMN     "question_id" INTEGER;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
