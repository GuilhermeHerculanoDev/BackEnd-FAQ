-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(30) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "category_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "users_id" INTEGER,
    "category_id" INTEGER,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "date" DATE,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer" (
    "id" SERIAL NOT NULL,
    "users_id" INTEGER,
    "category_id" INTEGER,
    "answer" VARCHAR(200) NOT NULL,
    "date" DATE,

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "category_category_name_key" ON "category"("category_name");

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
