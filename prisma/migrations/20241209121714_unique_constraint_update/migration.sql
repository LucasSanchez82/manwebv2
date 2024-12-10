/*
  Warnings:

  - A unique constraint covering the columns `[name,id]` on the table `type` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "type_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "type_name_id_key" ON "type"("name", "id");
