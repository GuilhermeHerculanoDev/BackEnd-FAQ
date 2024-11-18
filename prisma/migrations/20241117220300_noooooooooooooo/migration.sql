-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_question_id_fkey";

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
