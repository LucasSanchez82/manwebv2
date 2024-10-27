/*
  Warnings:

  - You are about to drop the column `slug` on the `mangas` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "mangas_slug_key";

-- AlterTable
ALTER TABLE "mangas" DROP COLUMN "slug";
