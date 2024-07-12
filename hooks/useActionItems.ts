import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { fetchLocalItems, getActionItems, createNewActionItem } from "@/services/actionItems";
import { ActionItem } from "@/types";

export function useActionItems() {
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [localItems, setLocalItems] = useState<ActionItem[]>([]);
  const [accessDenied, setAccessDenied] = useState(false);
  const [loadingLocalItems, setLoadingLocalItems] = useState(true);
  const [loadingActionItems, setLoadingActionItems] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const authToken = Cookies.get("auth_token");
      if (!authToken) {
        router.push("/login");
        return;
      }

      const { items, accessDenied } = await getActionItems(authToken);
      if (accessDenied) {
        setAccessDenied(true);
      } else {
        setActionItems(items);
      }
      setLoadingActionItems(false);
    };

    fetchData();
    fetchLocalItems().then((items) => {
      setLocalItems(items);
      setLoadingLocalItems(false);
    });
  }, [router]);

  const handleCreateNewActionItem = async () => {
    if (actionItems.length === 0) return;

    const firstItem = actionItems[0];
    const newItem: Partial<ActionItem> = {
      ...firstItem,
      description: `Random Description ${Math.random().toString(36).substring(7)}`,
    };

    try {
      const response = await createNewActionItem(newItem);
      setLocalItems((prev) => [...prev, response]);
      setSnackbarMessage("Action item created successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to create action item");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return {
    actionItems,
    localItems,
    accessDenied,
    loadingLocalItems,
    loadingActionItems,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    handleCreateNewActionItem,
    handleSnackbarClose,
    setActionItems
  };
}
