-- CreateTable
CREATE TABLE "Article" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "thumbnail" TEXT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "author" TEXT NOT NULL,
    "authorPic" TEXT,
    "url" TEXT NOT NULL,
    "hashtag" TEXT,
    "uid" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
