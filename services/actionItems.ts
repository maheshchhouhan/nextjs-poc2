import { ActionItem } from '@/types';

export const createNewActionItem = async (newItem: Partial<ActionItem>) => {
    const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
    });

    if (!response.ok) {
        throw new Error('Failed to create action item');
    }

    const result = await response.json();
    return result.newItem;
};

export const fetchLocalItems = async () => {
    const response = await fetch('/api/items');
    if (!response.ok) {
        throw new Error('Failed to fetch items');
    }
    const data = await response.json();
    return data.items;
};


export async function getActionItems(authToken: string) {
    if (!authToken) {
        return { items: [], accessDenied: true };
    }
    try {
        const response = await fetch('https://dev.exp-inc.com/EXPDev71/api/actionItems/searchActionItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'offset': "2.0",
                'Auth_Token': authToken.toString()
            },
            body: JSON.stringify({
                source: [],
                status: "Pending,Overdue,PendingVerification",
                verifiedBy: 0,
                reportedFlag: 0,
                pageNumber: 1,
                pageSize: 20,
                dLocationID: "",
                sortOrder: 2,
                actionNum: "",
                verifiedDateChecked: 0,
                actionItem: "",
                createdBy: 0,
                sortBy: 3,
                assignedToId: 0,
                summaryBy: 0,
                groupBy: 0,
                checkDateBy: 0,
                startVerifiedDate: "",
                endVerifiedDate: "",
                IsAdvancedSearch: false,
                lupID: 1,
                globalRatingId: 0,
                workRelated: 0,
                obsMethod: 0,
                obsClassId: 0,
                obsResultCategoryId: 0,
                obsResultSubCategoryId: 0,
            }),
        });
        const result = await response.json();
        return { items: result.data, accessDenied: false };
    } catch (error) {
        return { items: [], accessDenied: false };
    }
}
