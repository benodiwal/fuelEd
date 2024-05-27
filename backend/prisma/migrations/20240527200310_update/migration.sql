/*
  Warnings:

  - You are about to drop the column `roleId` on the `ChannelParticipant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChannelParticipant" DROP CONSTRAINT "ChannelParticipant_guestId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelParticipant" DROP CONSTRAINT "ChannelParticipant_hostId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelParticipant" DROP CONSTRAINT "ChannelParticipant_vendorId_fkey";

-- DropIndex
DROP INDEX "ChannelParticipant_roleId_key";

-- AlterTable
ALTER TABLE "ChannelParticipant" DROP COLUMN "roleId",
ADD COLUMN     "guestId" TEXT,
ADD COLUMN     "hostId" TEXT,
ADD COLUMN     "vendorId" TEXT;

-- AddForeignKey
ALTER TABLE "ChannelParticipant" ADD CONSTRAINT "ChannelParticipant_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelParticipant" ADD CONSTRAINT "ChannelParticipant_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelParticipant" ADD CONSTRAINT "ChannelParticipant_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
