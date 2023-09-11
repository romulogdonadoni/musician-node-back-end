/*
  Warnings:

  - You are about to drop the column `userId` on the `playlist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "playlist" DROP CONSTRAINT "playlist_userId_fkey";

-- AlterTable
ALTER TABLE "playlist" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "playlist" ADD CONSTRAINT "playlist_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
