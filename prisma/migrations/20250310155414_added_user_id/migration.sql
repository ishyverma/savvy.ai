-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_folderId_fkey";

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "folderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tweet" ALTER COLUMN "folderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "folderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Website" ALTER COLUMN "folderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
