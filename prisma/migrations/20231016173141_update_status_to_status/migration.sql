/*
  Warnings:

  - You are about to drop the column `Status` on the `Barbecue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Barbecue" DROP COLUMN "Status",
ADD COLUMN     "status" "BarbecueStatus" NOT NULL DEFAULT 'PENDING';
