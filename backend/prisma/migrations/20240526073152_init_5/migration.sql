-- DropIndex
DROP INDEX "Host_userId_key";

-- CreateTable
CREATE TABLE "EventFloorPlan" (
    "id" TEXT NOT NULL,
    "floorPlanJson" JSONB NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventFloorPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventFloorPlan_eventId_key" ON "EventFloorPlan"("eventId");

-- AddForeignKey
ALTER TABLE "EventFloorPlan" ADD CONSTRAINT "EventFloorPlan_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
