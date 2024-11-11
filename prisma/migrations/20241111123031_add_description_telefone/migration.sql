/*
  Warnings:

  - Added the required column `description` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "description" VARCHAR(200) NOT NULL,
ADD COLUMN     "telephone" INTEGER NOT NULL DEFAULT 0;
