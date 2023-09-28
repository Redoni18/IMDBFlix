/*
  Warnings:

  - You are about to drop the column `seriesId` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `seriesId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `TvSeries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GenreToTvSeries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PersonToTvSeries` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `movieId` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToTvSeries" DROP CONSTRAINT "_GenreToTvSeries_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToTvSeries" DROP CONSTRAINT "_GenreToTvSeries_B_fkey";

-- DropForeignKey
ALTER TABLE "_PersonToTvSeries" DROP CONSTRAINT "_PersonToTvSeries_A_fkey";

-- DropForeignKey
ALTER TABLE "_PersonToTvSeries" DROP CONSTRAINT "_PersonToTvSeries_B_fkey";

-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "seriesId",
ADD COLUMN     "movieId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "endYear" INTEGER,
ADD COLUMN     "seasons" INTEGER,
ADD COLUMN     "startYear" INTEGER;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "seriesId";

-- DropTable
DROP TABLE "TvSeries";

-- DropTable
DROP TABLE "_GenreToTvSeries";

-- DropTable
DROP TABLE "_PersonToTvSeries";

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
