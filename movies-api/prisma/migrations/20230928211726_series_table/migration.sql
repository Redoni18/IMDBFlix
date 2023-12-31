-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "poster" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvSeries" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "seasons" INTEGER NOT NULL,
    "poster" TEXT NOT NULL,

    CONSTRAINT "TvSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "seriesId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "seriesId" INTEGER NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieToPerson" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PersonToTvSeries" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToMovie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToTvSeries" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToPerson_AB_unique" ON "_MovieToPerson"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToPerson_B_index" ON "_MovieToPerson"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PersonToTvSeries_AB_unique" ON "_PersonToTvSeries"("A", "B");

-- CreateIndex
CREATE INDEX "_PersonToTvSeries_B_index" ON "_PersonToTvSeries"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToMovie_AB_unique" ON "_GenreToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToMovie_B_index" ON "_GenreToMovie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToTvSeries_AB_unique" ON "_GenreToTvSeries"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToTvSeries_B_index" ON "_GenreToTvSeries"("B");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "TvSeries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "TvSeries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToPerson" ADD CONSTRAINT "_MovieToPerson_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToPerson" ADD CONSTRAINT "_MovieToPerson_B_fkey" FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonToTvSeries" ADD CONSTRAINT "_PersonToTvSeries_A_fkey" FOREIGN KEY ("A") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonToTvSeries" ADD CONSTRAINT "_PersonToTvSeries_B_fkey" FOREIGN KEY ("B") REFERENCES "TvSeries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToTvSeries" ADD CONSTRAINT "_GenreToTvSeries_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToTvSeries" ADD CONSTRAINT "_GenreToTvSeries_B_fkey" FOREIGN KEY ("B") REFERENCES "TvSeries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
