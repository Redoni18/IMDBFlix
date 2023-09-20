/*
  Warnings:

  - You are about to drop the column `type` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the `Episode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_movieId_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "type";

-- DropTable
DROP TABLE "Episode";
