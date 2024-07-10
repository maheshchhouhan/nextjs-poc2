/*
  Warnings:

  - You are about to drop the column `actionSourceDescription` on the `ActionItem` table. All the data in the column will be lost.
  - You are about to drop the column `actionSourceID` on the `ActionItem` table. All the data in the column will be lost.
  - Added the required column `assignedWorkGroupID` to the `ActionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rootCauseId` to the `ActionItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "RootCause" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL
);

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
    "assignedToUser" TEXT NOT NULL,
    "assignedWorkGroupID" INTEGER NOT NULL,
    "assignedWorkGroupName" TEXT,
    "assignedWorkGroupDetail" TEXT,
    "targetDate" DATETIME NOT NULL,
    "compDate" DATETIME,
    "verifiedDate" DATETIME,
    "directCost" INTEGER NOT NULL,
    "indirectHours" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdByName" TEXT NOT NULL,
    "createdDate" DATETIME NOT NULL,
    "updatedBy" INTEGER,
    "updatedByName" TEXT,
    "updatedDate" DATETIME,
    "notifiedDate" DATETIME NOT NULL,
    "priority" INTEGER NOT NULL,
    "priorityS" TEXT NOT NULL,
    "mgmtResponse" TEXT NOT NULL,
    "recommendationLevelID" INTEGER NOT NULL,
    "recommendationLevel" TEXT,
    "approverID" INTEGER NOT NULL,
    "isApprovalRequired" BOOLEAN NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "locationId" INTEGER NOT NULL,
    "hseCodeId" INTEGER NOT NULL,
    "hseCodeName" TEXT NOT NULL,
    "completeBeforeSubmitForApproval" BOOLEAN NOT NULL,
    "actionItemSource" TEXT NOT NULL,
    "clientID" INTEGER NOT NULL,
    "abbr" TEXT NOT NULL,
    "isVerificationRequired" BOOLEAN NOT NULL,
    "verificationAssignedToID" INTEGER NOT NULL,
    "reportNum" TEXT NOT NULL,
    "reportDescription" TEXT NOT NULL,
    "locationPath" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "currencyID" INTEGER NOT NULL,
    "currencyvthCode" TEXT NOT NULL,
    "rootCauseId" INTEGER NOT NULL,
    "subSource" TEXT,
    "newVarcharId1" TEXT,
    "findingDescription" TEXT,
    "permitStatus" TEXT,
    "preventive" TEXT NOT NULL,
    "resetReason" TEXT,
    "newTargetDate" DATETIME,
    "completedBy" INTEGER,
    "completedByName" TEXT,
    "verifiedBy" INTEGER,
    "verifiedByName" TEXT,
    "answerID" INTEGER NOT NULL,
    "repeatAnswerID" INTEGER NOT NULL,
    "ansSource" TEXT NOT NULL,
    "ansSourceID" INTEGER NOT NULL,
    "ansSubSource" TEXT NOT NULL,
    "ansSubSourceID" INTEGER NOT NULL,
    "recurringActionID" INTEGER,
    "isPostStartUp" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ActionItem_rootCauseId_fkey" FOREIGN KEY ("rootCauseId") REFERENCES "RootCause" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ActionItem" ("abbr", "actionItemSource", "actionNum", "ansSource", "ansSourceID", "ansSubSource", "ansSubSourceID", "answerID", "approverID", "assignedToID", "assignedToUser", "clientID", "compDate", "completeBeforeSubmitForApproval", "completedBy", "completedByName", "createdAt", "createdBy", "createdByName", "createdDate", "currencyID", "currencyvthCode", "description", "directCost", "findingDescription", "hseCodeId", "hseCodeName", "id", "indirectHours", "isApprovalRequired", "isApproved", "isPostStartUp", "isVerificationRequired", "item", "locationId", "locationPath", "mgmtResponse", "notifiedDate", "permitStatus", "preventive", "priority", "priorityS", "recommendationLevelID", "recurringActionID", "referenceID", "repeatAnswerID", "reportDescription", "reportNum", "source", "targetDate", "updatedAt", "updatedBy", "updatedByName", "updatedDate", "verificationAssignedToID", "verifiedBy", "verifiedByName", "verifiedDate") SELECT "abbr", "actionItemSource", "actionNum", "ansSource", "ansSourceID", "ansSubSource", "ansSubSourceID", "answerID", "approverID", "assignedToID", "assignedToUser", "clientID", "compDate", "completeBeforeSubmitForApproval", "completedBy", "completedByName", "createdAt", "createdBy", "createdByName", "createdDate", "currencyID", "currencyvthCode", "description", "directCost", "findingDescription", "hseCodeId", "hseCodeName", "id", "indirectHours", "isApprovalRequired", "isApproved", "isPostStartUp", "isVerificationRequired", "item", "locationId", "locationPath", "mgmtResponse", "notifiedDate", "permitStatus", "preventive", "priority", "priorityS", "recommendationLevelID", "recurringActionID", "referenceID", "repeatAnswerID", "reportDescription", "reportNum", "source", "targetDate", "updatedAt", "updatedBy", "updatedByName", "updatedDate", "verificationAssignedToID", "verifiedBy", "verifiedByName", "verifiedDate" FROM "ActionItem";
DROP TABLE "ActionItem";
ALTER TABLE "new_ActionItem" RENAME TO "ActionItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
