-- CreateTable
CREATE TABLE "_MovieToPerson" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToPerson_AB_unique" ON "_MovieToPerson"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToPerson_B_index" ON "_MovieToPerson"("B");

-- AddForeignKey
ALTER TABLE "_MovieToPerson" ADD CONSTRAINT "_MovieToPerson_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToPerson" ADD CONSTRAINT "_MovieToPerson_B_fkey" FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
