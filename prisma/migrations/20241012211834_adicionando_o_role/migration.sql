/*
  Warnings:

  - You are about to drop the column `is_admin` on the `Users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "is_admin",
ADD COLUMN     "role" "role" NOT NULL DEFAULT 'USER';
