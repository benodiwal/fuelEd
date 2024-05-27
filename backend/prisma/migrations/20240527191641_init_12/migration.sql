-- DropIndex
DROP INDEX "Invite_eventId_key";

-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "nickName" TEXT,
ADD COLUMN     "profileCompleted" BOOLEAN NOT NULL DEFAULT false;
