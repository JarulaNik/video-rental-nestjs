/*
  Warnings:

  - A unique constraint covering the columns `[imageUrl]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "picture" TEXT,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Pictures" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT,
    "description" TEXT,
    "visibility" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Pictures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pictures_url_key" ON "Pictures"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_imageUrl_key" ON "Movie"("imageUrl");

-- AddForeignKey
ALTER TABLE "Pictures" ADD CONSTRAINT "Pictures_url_fkey" FOREIGN KEY ("url") REFERENCES "Movie"("imageUrl") ON DELETE RESTRICT ON UPDATE CASCADE;
