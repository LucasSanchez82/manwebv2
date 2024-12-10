/*
  Warnings:

  - You are about to drop the `_CategoryToManga` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mangas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToManga" DROP CONSTRAINT "_CategoryToManga_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToManga" DROP CONSTRAINT "_CategoryToManga_B_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "mangas" DROP CONSTRAINT "mangas_userId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropTable
DROP TABLE "_CategoryToManga";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "mangas";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "readerUrl" TEXT,
    "image" TEXT,
    "isSelfHosted" BOOLEAN NOT NULL DEFAULT false,
    "chapter" INTEGER NOT NULL,
    "description" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorie" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToContent" (
    "A" TEXT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_provider_account_id_key" ON "account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "session_session_token_key" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "content_title_typeId_key" ON "content"("title", "typeId");

-- CreateIndex
CREATE UNIQUE INDEX "type_name_key" ON "type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categorie_name_key" ON "categorie"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToContent_AB_unique" ON "_CategoryToContent"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToContent_B_index" ON "_CategoryToContent"("B");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToContent" ADD CONSTRAINT "_CategoryToContent_A_fkey" FOREIGN KEY ("A") REFERENCES "categorie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToContent" ADD CONSTRAINT "_CategoryToContent_B_fkey" FOREIGN KEY ("B") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
