-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "professorUserId" INTEGER NOT NULL,
    "passiveCheckIn" BOOLEAN NOT NULL DEFAULT false,
    "cooldownMinutes" INTEGER NOT NULL DEFAULT 10,
    CONSTRAINT "Class_professorUserId_fkey" FOREIGN KEY ("professorUserId") REFERENCES "Professor" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Class" ("id", "name", "professorUserId") SELECT "id", "name", "professorUserId" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
