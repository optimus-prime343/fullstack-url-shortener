-- CreateTable
CREATE TABLE "OpenGraphMetaData" (
    "id" TEXT NOT NULL,
    "ogTitle" TEXT,
    "ogUrl" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "urlId" TEXT NOT NULL,

    CONSTRAINT "OpenGraphMetaData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OpenGraphMetaData_urlId_key" ON "OpenGraphMetaData"("urlId");

-- AddForeignKey
ALTER TABLE "OpenGraphMetaData" ADD CONSTRAINT "OpenGraphMetaData_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
