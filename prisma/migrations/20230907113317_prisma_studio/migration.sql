/*
  Warnings:

  - You are about to drop the column `creationDate` on the `album` table. All the data in the column will be lost.
  - You are about to drop the column `creationDate` on the `music` table. All the data in the column will be lost.
  - You are about to drop the column `src` on the `music` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorName` to the `album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicUrl` to the `album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicUrl` to the `music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `music` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `user_username_key` ON `user`;

-- AlterTable
ALTER TABLE `album` DROP COLUMN `creationDate`,
    ADD COLUMN `authorName` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `musicUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `releaseDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `music` DROP COLUMN `creationDate`,
    DROP COLUMN `src`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `musicUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `releaseDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `image` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);
