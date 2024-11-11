/*
  Warnings:

  - Made the column `description` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telephone` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "telephone" SET NOT NULL;
