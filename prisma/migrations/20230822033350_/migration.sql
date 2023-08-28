/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Medias` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Medias_username_key" ON "Medias"("username");
