"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Hidden,
} from "@mui/material";
import { ActionItem } from "@/types";
import { fetchLocalItems, createNewActionItem } from "@/services/actionItems";

type ActionItemTableProps = {
  items: ActionItem[];
};

export default function ActionItemTable({ items }: ActionItemTableProps) {
  const [editRows, setEditRows] = useState<{ [key: number]: boolean }>({});
  const [editedUsers, setEditedUsers] = useState<ActionItem[]>(items);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [localItems, setLocalItems] = useState<ActionItem[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchLocalItems().then(setLocalItems);
  }, []);

  const handleEdit = (id: number) => {
    setEditRows({ ...editRows, [id]: true });
  };

  const handleSave = async (id: number) => {
    setEditRows({ ...editRows, [id]: false });
    const item = editedUsers.find((item) => item.id === id);

    if (item) {
      setSnackbarOpen(true);
    }
  };

  const handleChange = (id: number, field: string, value: string) => {
    setEditedUsers((prevUsers) =>
      prevUsers.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCreateNewActionItem = async () => {
    if (editedUsers.length === 0) return;

    const firstItem = editedUsers[0];
    const newItem: Partial<ActionItem> = {
      ...firstItem,
      description: `Random Description ${Math.random()
        .toString(36)
        .substring(7)}`,
    };

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) throw new Error("Failed to create action item");
      const savedItem = await response.json();
      setLocalItems((prev) => [...prev, savedItem.newItem]);
      setSnackbarMessage("Action item created successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to create action item");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
          mt: 12,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNewActionItem}
        >
          Create Action Item
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Local Action Items
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>Action Item #</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {localItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.locationPath}</TableCell>
                  <TableCell>{item.source}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ width: "100%", mt: 6 }}>
        <Typography variant="h6" gutterBottom>
          Online Action Items
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }}>
            <Hidden smDown>
              <TableHead>
                <TableRow>
                  <TableCell>Action Item #</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Action Item Source</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
            </Hidden>
            <TableBody>
              {editedUsers.map((item) => (
                <React.Fragment key={item.id}>
                  {isMobile ? (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ padding: 0 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: 2,
                            width: "100%",
                          }}
                        >
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="body2" component="div">
                              {editRows[item.id] ? (
                                <TextField
                                  value={item.id.toString()}
                                  fullWidth
                                />
                              ) : (
                                item.id.toString()
                              )}
                            </Typography>
                          </Box>
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="body2" component="div">
                              {editRows[item.id] ? (
                                <TextField
                                  value={item.locationPath}
                                  fullWidth
                                />
                              ) : (
                                item.locationPath
                              )}
                            </Typography>
                          </Box>
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="body2" component="div">
                              {editRows[item.id] ? (
                                <TextField value={item.source} fullWidth />
                              ) : (
                                item.source
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell>
                        {editRows[item.id] ? (
                          <TextField value={item.id} fullWidth />
                        ) : (
                          item.id.toString()
                        )}
                      </TableCell>
                      <TableCell>
                        {editRows[item.id] ? (
                          <TextField value={item.locationPath} fullWidth />
                        ) : (
                          item.locationPath
                        )}
                      </TableCell>
                      <TableCell>
                        {editRows[item.id] ? (
                          <TextField
                            value={item.source}
                            onChange={(e) =>
                              handleChange(item.id, "source", e.target.value)
                            }
                            fullWidth
                          />
                        ) : (
                          item.source
                        )}
                      </TableCell>
                      <TableCell width={250}>
                        {editRows[item.id] ? (
                          <TextField
                            value={item.item}
                            onChange={(e) =>
                              handleChange(item.id, "description", e.target.value)
                            }
                            fullWidth
                          />
                        ) : (
                          item.item
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
