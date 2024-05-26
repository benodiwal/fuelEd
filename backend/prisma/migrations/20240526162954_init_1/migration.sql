/*
  Warnings:

  - Added the required column `updatedAt` to the `EventPoll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `EventPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventPoll" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "EventPost" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
