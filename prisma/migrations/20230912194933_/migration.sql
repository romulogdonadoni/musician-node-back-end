/*
  Warnings:

  - Added the required column `musicId` to the `musicviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "music" DROP CONSTRAINT "music_musicViewsId_fkey";

-- AlterTable
ALTER TABLE "musicviews" ADD COLUMN     "musicId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "musicviews" ADD CONSTRAINT "musicviews_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
