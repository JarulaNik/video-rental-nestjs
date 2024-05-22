/*
  Warnings:

  - The primary key for the `Movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Movie` table. All the data in the column will be lost.
  - The required column `_id` was added to the `Movie` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `releaseYear` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `genre` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `Role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RentedMovie" DROP CONSTRAINT "RentedMovie_movieId_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" UUID NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "releaseYear" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "genre" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL,
ADD CONSTRAINT "Movie_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Role" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RentedMovie" ADD CONSTRAINT "RentedMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
