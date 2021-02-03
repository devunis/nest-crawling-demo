/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[uid]` on the table `Article`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Article.uid_unique" ON "Article"("uid");
