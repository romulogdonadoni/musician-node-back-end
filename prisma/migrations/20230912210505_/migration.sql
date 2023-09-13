/*
  Warnings:

  - A unique constraint covering the columns `[musicId,authorId]` on the table `musicviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "musicviews_musicId_authorId_key" ON "musicviews"("musicId", "authorId");
