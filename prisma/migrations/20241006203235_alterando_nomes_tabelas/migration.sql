/*
  Warnings:

  - You are about to drop the `answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_users_id_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_category_id_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_users_id_fkey";

-- DropTable
DROP TABLE "answer";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "questions";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(30) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "users_id" INTEGER,
    "category_id" INTEGER,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "date" DATE,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answers" (
    "id" SERIAL NOT NULL,
    "users_id" INTEGER,
    "question_id" INTEGER,
    "answer" VARCHAR(200) NOT NULL,
    "date" DATE,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_name_key" ON "Category"("category_name");

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
