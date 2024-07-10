import { getAuthToken } from "@/services/utils";
import { getActionItems } from "@/services/actionItems";
import { ActionItem } from "@/types";
import ActionItemTable from "@/components/ActionItemsTable";

export default async function ActionItemsPage() {
  const authToken = (await getAuthToken()) as string;
  const { items, accessDenied } = await getActionItems(authToken);
  
  if (accessDenied) {
    return <div>Access Denied</div>;
  }

  const combinedItems: ActionItem[] = [...items];

  return <ActionItemTable items={combinedItems} />;
}
