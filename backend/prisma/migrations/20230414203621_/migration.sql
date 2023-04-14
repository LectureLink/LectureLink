/*
  Warnings:

  - You are about to drop the column `classId` on the `EngagementData` table. All the data in the column will be lost.
  - Added the required column `sessionId` to the `EngagementData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "classId" INTEGER NOT NULL,
    CONSTRAINT "Session_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EngagementData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "engagementLevel" INTEGER NOT NULL,
    "studentUserId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EngagementData_studentUserId_fkey" FOREIGN KEY ("studentUserId") REFERENCES "Student" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EngagementData_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EngagementData" ("engagementLevel", "id", "studentUserId", "timestamp") SELECT "engagementLevel", "id", "studentUserId", "timestamp" FROM "EngagementData";
DROP TABLE "EngagementData";
ALTER TABLE "new_EngagementData" RENAME TO "EngagementData";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id") SELECT "email", "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
