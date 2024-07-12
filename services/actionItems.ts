import { ActionItem } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createNewActionItem = async (newItem: Partial<ActionItem>) => {
  const response = await fetch(`${API_BASE_URL}/api/items`, {
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
  const response = await fetch(`${API_BASE_URL}/api/items`);
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
    const response = await fetch(`${API_BASE_URL}/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ authToken }),
    });
    const result = await response.json();
    return { items: result.items, accessDenied: result.accessDenied };
  } catch (error) {
    return { items: [], accessDenied: true };
  }
}
