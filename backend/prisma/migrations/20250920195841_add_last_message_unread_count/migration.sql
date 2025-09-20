-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "lastMessageId" TEXT,
ADD COLUMN     "unreadCount" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_lastMessageId_fkey" FOREIGN KEY ("lastMessageId") REFERENCES "public"."Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
