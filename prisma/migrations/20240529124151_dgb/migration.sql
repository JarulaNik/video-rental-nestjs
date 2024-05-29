-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "rentalPrice" JSONB NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "picture" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "RentedMovie" (
    "userId" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "rentalEndDate" TIMESTAMP(3)
);

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_imageUrl_key" ON "Movie"("imageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "RentedMovie_userId_movieId_key" ON "RentedMovie"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "Pictures_url_key" ON "Pictures"("url");

-- AddForeignKey
ALTER TABLE "RentedMovie" ADD CONSTRAINT "RentedMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedMovie" ADD CONSTRAINT "RentedMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pictures" ADD CONSTRAINT "Pictures_url_fkey" FOREIGN KEY ("url") REFERENCES "Movie"("imageUrl") ON DELETE RESTRICT ON UPDATE CASCADE;
