-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Note';

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Tweet';

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Video';

-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Website';
