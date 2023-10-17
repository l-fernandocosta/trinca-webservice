-- CreateEnum
CREATE TYPE "BarbecueGuestStatus" AS ENUM ('CONFIRMED', 'PENDING');

-- AlterTable
ALTER TABLE "GuestBarbecue" ADD COLUMN     "status" "BarbecueGuestStatus" NOT NULL DEFAULT 'PENDING';
