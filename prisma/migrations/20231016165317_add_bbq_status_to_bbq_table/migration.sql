-- CreateEnum
CREATE TYPE "BarbecueStatus" AS ENUM ('PENDING', 'RUNNING', 'CANCELED', 'FINISHED');

-- AlterTable
ALTER TABLE "Barbecue" ADD COLUMN     "Status" "BarbecueStatus" NOT NULL DEFAULT 'PENDING';
