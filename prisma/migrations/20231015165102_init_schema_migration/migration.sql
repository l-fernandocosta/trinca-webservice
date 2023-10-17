-- CreateTable
CREATE TABLE "Barbecue" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "minContribution" DOUBLE PRECISION NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Barbecue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestBarbecue" (
    "id" TEXT NOT NULL,
    "contribution" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "barbecueId" TEXT NOT NULL,

    CONSTRAINT "GuestBarbecue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Barbecue" ADD CONSTRAINT "Barbecue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestBarbecue" ADD CONSTRAINT "GuestBarbecue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestBarbecue" ADD CONSTRAINT "GuestBarbecue_barbecueId_fkey" FOREIGN KEY ("barbecueId") REFERENCES "Barbecue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
