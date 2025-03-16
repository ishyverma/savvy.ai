/*
  Warnings:

  - Added the required column `userId` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "MemoryType";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
