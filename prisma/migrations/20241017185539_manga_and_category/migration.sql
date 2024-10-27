-- CreateTable
CREATE TABLE "mangas" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "readerUrl" TEXT NOT NULL,
    "image" TEXT,
    "chapter" INTEGER NOT NULL,
    "description" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "mangas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToManga" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "mangas_slug_key" ON "mangas"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToManga_AB_unique" ON "_CategoryToManga"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToManga_B_index" ON "_CategoryToManga"("B");

-- AddForeignKey
ALTER TABLE "mangas" ADD CONSTRAINT "mangas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToManga" ADD CONSTRAINT "_CategoryToManga_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToManga" ADD CONSTRAINT "_CategoryToManga_B_fkey" FOREIGN KEY ("B") REFERENCES "mangas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
