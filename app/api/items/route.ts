import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.actionItem.findMany();
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching local items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data:', data); // Log incoming data

    // Check if rootCauseId is valid or exists, handle optional cases
    if (data.rootCauseId) {
      const rootCauseExists = await prisma.rootCause.findUnique({
        where: { id: data.rootCauseId },
      });
      if (!rootCauseExists) {
        throw new Error(`RootCause with id ${data.rootCauseId} does not exist`);
      }
    }

    const newItem = await prisma.actionItem.create({
      data: {
        actionNum: data.actionNum,
        source: data.source,
        referenceID: data.referenceID,
        item: data.item,
        assignedToID: data.assignedToID,
        assignedToUser: data.assignedToUser,
        assignedWorkGroupID: data.assignedWorkGroupID,
        assignedWorkGroupName: data.assignedWorkGroupName,
        assignedWorkGroupDetail: data.assignedWorkGroupDetail,
        targetDate: new Date(data.targetDate),
        compDate: data.compDate ? new Date(data.compDate) : null,
        verifiedDate: data.verifiedDate ? new Date(data.verifiedDate) : null,
        directCost: data.directCost,
        indirectHours: data.indirectHours,
        createdBy: data.createdBy,
        createdByName: data.createdByName,
        createdDate: new Date(data.createdDate),
        updatedBy: data.updatedBy,
        updatedByName: data.updatedByName,
        updatedDate: data.updatedDate ? new Date(data.updatedDate) : null,
        notifiedDate: new Date(data.notifiedDate),
        priority: data.priority,
        priorityS: data.priorityS,
        mgmtResponse: data.mgmtResponse,
        recommendationLevelID: data.recommendationLevelID,
        recommendationLevel: data.recommendationLevel,
        approverID: data.approverID,
        isApprovalRequired: data.isApprovalRequired,
        isApproved: data.isApproved,
        locationId: data.locationId,
        hseCodeId: data.hseCodeId,
        hseCodeName: data.hseCodeName,
        completeBeforeSubmitForApproval: data.completeBeforeSubmitForApproval,
        actionItemSource: data.actionItemSource,
        clientID: data.clientID,
        abbr: data.abbr,
        isVerificationRequired: data.isVerificationRequired,
        verificationAssignedToID: data.verificationAssignedToID,
        reportNum: data.reportNum,
        reportDescription: data.reportDescription,
        locationPath: data.locationPath,
        description: data.description,
        currencyID: data.currencyID,
        currencyvthCode: data.currencyvthCode,
        rootCause: data.rootCauseId ? { connect: { id: data.rootCauseId } } : undefined,
        subSource: data.subSource,
        newVarcharId1: data.newVarcharId1,
        findingDescription: data.findingDescription,
        permitStatus: data.permitStatus,
        preventive: data.preventive,
        resetReason: data.resetReason,
        newTargetDate: data.newTargetDate ? new Date(data.newTargetDate) : null,
        completedBy: data.completedBy,
        completedByName: data.completedByName,
        verifiedBy: data.verifiedBy,
        verifiedByName: data.verifiedByName,
        answerID: data.answerID,
        repeatAnswerID: data.repeatAnswerID,
        ansSource: data.ansSource,
        ansSourceID: data.ansSourceID,
        ansSubSource: data.ansSubSource,
        ansSubSourceID: data.ansSubSourceID,
        recurringActionID: data.recurringActionID,
        isPostStartUp: data.isPostStartUp,
      },
    });
    console.log('Created new item:', newItem); // Log created item
    return NextResponse.json({ newItem });
  } catch (error) {
    console.error('Error creating action item:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
