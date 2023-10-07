/*
  Warnings:

  - You are about to drop the column `profileImg` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileImg",
ADD COLUMN     "profileImage" TEXT;
