/*
  Warnings:

  - Added the required column `abbr` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actionItemSource` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actionNum` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actionSourceDescription` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actionSourceID` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ansSource` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ansSourceID` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ansSubSource` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ansSubSourceID` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answerID` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approverID` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignedToID` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignedToUser` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientID` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completeBeforeSubmitForApproval` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completedByName` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdByName` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdDate` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyID` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyvthCode` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `directCost` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `findingDescription` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hseCodeId` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hseCodeName` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indirectHours` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isApprovalRequired` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isApproved` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPostStartUp` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVerificationRequired` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mgmtResponse` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notifiedDate` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permitStatus` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preventive` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priorityS` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommendationLevelID` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceID` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repeatAnswerID` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportDescription` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportNum` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetDate` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedByName` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationAssignedToID` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifiedByName` to the `ActionItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ActionItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "actionNum" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "referenceID" INTEGER NOT NULL,
    "item" TEXT NOT NULL,
    "assignedToID" INTEGER NOT NULL,
    "targetDate" DATETIME NOT NULL,
    "compDate" DATETIME,
    "verifiedDate" DATETIME,
    "directCost" INTEGER NOT NULL,
    "indirectHours" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdDate" DATETIME NOT NULL,
    "updatedBy" INTEGER,
    "updatedDate" DATETIME,
    "notifiedDate" DATETIME NOT NULL,
    "priority" INTEGER NOT NULL,
    "priorityS" TEXT NOT NULL,
    "mgmtResponse" TEXT NOT NULL,
    "recommendationLevelID" INTEGER NOT NULL,
    "completedBy" INTEGER,
    "verifiedBy" INTEGER,
    "currencyID" INTEGER NOT NULL,
    "currencyvthCode" TEXT NOT NULL,
    "preventive" TEXT NOT NULL,
    "updatedByName" TEXT NOT NULL,
    "createdByName" TEXT NOT NULL,
    "completedByName" TEXT NOT NULL,
    "verifiedByName" TEXT NOT NULL,
    "approverID" INTEGER NOT NULL,
    "isApprovalRequired" BOOLEAN NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "actionSourceID" INTEGER NOT NULL,
    "actionSourceDescription" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "hseCodeId" INTEGER NOT NULL,
    "hseCodeName" TEXT NOT NULL,
    "completeBeforeSubmitForApproval" BOOLEAN NOT NULL,
    "assignedToUser" TEXT NOT NULL,
    "actionItemSource" TEXT NOT NULL,
    "clientID" INTEGER NOT NULL,
    "abbr" TEXT NOT NULL,
    "isVerificationRequired" BOOLEAN NOT NULL,
    "verificationAssignedToID" INTEGER NOT NULL,
    "answerID" INTEGER NOT NULL,
    "repeatAnswerID" INTEGER NOT NULL,
    "ansSource" TEXT NOT NULL,
    "ansSourceID" INTEGER NOT NULL,
    "ansSubSource" TEXT NOT NULL,
    "ansSubSourceID" INTEGER NOT NULL,
    "reportNum" TEXT NOT NULL,
    "reportDescription" TEXT NOT NULL,
    "findingDescription" TEXT NOT NULL,
    "permitStatus" TEXT NOT NULL,
    "recurringActionID" INTEGER,
    "isPostStartUp" BOOLEAN NOT NULL,
    "locationPath" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ActionItem" ("createdAt", "description", "id", "locationPath", "source", "updatedAt") SELECT "createdAt", "description", "id", "locationPath", "source", "updatedAt" FROM "ActionItem";
DROP TABLE "ActionItem";
ALTER TABLE "new_ActionItem" RENAME TO "ActionItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
