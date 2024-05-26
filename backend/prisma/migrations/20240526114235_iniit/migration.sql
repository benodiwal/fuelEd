/*
  Warnings:

  - You are about to drop the `_EventToGuest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToVendor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToGuest" DROP CONSTRAINT "_EventToGuest_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToGuest" DROP CONSTRAINT "_EventToGuest_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToVendor" DROP CONSTRAINT "_EventToVendor_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToVendor" DROP CONSTRAINT "_EventToVendor_B_fkey";

-- DropIndex
DROP INDEX "Guest_userId_key";

-- DropIndex
DROP INDEX "Vendor_userId_key";

-- DropTable
DROP TABLE "_EventToGuest";

-- DropTable
DROP TABLE "_EventToVendor";

-- CreateTable
CREATE TABLE "EventGuest" (
    "guestId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventGuest_pkey" PRIMARY KEY ("guestId","eventId")
);

-- CreateTable
CREATE TABLE "EventVendor" (
    "eventId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "EventVendor_pkey" PRIMARY KEY ("eventId","vendorId")
);

-- AddForeignKey
ALTER TABLE "EventGuest" ADD CONSTRAINT "EventGuest_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGuest" ADD CONSTRAINT "EventGuest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventVendor" ADD CONSTRAINT "EventVendor_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventVendor" ADD CONSTRAINT "EventVendor_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
