/*
  Warnings:

  - The primary key for the `mangas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `mangas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `B` on the `_CategoryToManga` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToManga" DROP CONSTRAINT "_CategoryToManga_B_fkey";

-- AlterTable
ALTER TABLE "_CategoryToManga" DROP COLUMN "B",
ADD COLUMN     "B" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "mangas" DROP CONSTRAINT "mangas_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "mangas_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToManga_AB_unique" ON "_CategoryToManga"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToManga_B_index" ON "_CategoryToManga"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToManga" ADD CONSTRAINT "_CategoryToManga_B_fkey" FOREIGN KEY ("B") REFERENCES "mangas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
