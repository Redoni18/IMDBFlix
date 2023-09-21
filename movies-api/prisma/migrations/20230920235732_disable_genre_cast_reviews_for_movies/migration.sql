/*
  Warnings:

  - You are about to drop the `_GenreToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToPerson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_movieId_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToPerson" DROP CONSTRAINT "_MovieToPerson_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToPerson" DROP CONSTRAINT "_MovieToPerson_B_fkey";

-- DropTable
DROP TABLE "_GenreToMovie";

-- DropTable
DROP TABLE "_MovieToPerson";
