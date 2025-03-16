/*
  Warnings:

  - The `type` column on the `Folder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Note` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Tweet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Website` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Folder', 'Note', 'Tweet', 'Video', 'Website');

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'Folder';

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'Note';

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'Tweet';

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'Video';

-- AlterTable
ALTER TABLE "Website" DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'Website';
