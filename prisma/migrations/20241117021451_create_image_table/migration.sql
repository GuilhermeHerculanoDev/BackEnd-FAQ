-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "category_image" BYTEA;

-- AlterTable
ALTER TABLE "Questions" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);