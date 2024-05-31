-- CreateTable
CREATE TABLE "EventPollOptionSelection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventPollOptionId" TEXT NOT NULL,

    CONSTRAINT "EventPollOptionSelection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventPollOptionSelection" ADD CONSTRAINT "EventPollOptionSelection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPollOptionSelection" ADD CONSTRAINT "EventPollOptionSelection_eventPollOptionId_fkey" FOREIGN KEY ("eventPollOptionId") REFERENCES "EventPollOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
