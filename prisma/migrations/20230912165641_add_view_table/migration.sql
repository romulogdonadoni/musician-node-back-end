-- AlterTable
ALTER TABLE "music" ADD COLUMN     "musicViewsId" TEXT;

-- CreateTable
CREATE TABLE "musicviews" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "musicviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "music" ADD CONSTRAINT "music_musicViewsId_fkey" FOREIGN KEY ("musicViewsId") REFERENCES "musicviews"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "musicviews" ADD CONSTRAINT "musicviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
