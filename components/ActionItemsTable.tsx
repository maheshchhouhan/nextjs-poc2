"use client";

import React, { useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { useActionItems } from "@/hooks/useActionItems";

export default function ActionItemTable() {
  const {
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
    setActionItems,
  } = useActionItems();

  const [editRows, setEditRows] = useState<{ [key: number]: boolean }>({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (id: number, field: string, value: string) => {
    setActionItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  if (accessDenied) {
    return <div>Access Denied</div>;
  }

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
        {loadingLocalItems ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
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
        )}
      </Box>
      <Box sx={{ width: "100%", mt: 6 }}>
        <Typography variant="h6" gutterBottom>
          Online Action Items
        </Typography>
        {loadingActionItems ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Action Item #</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Action Item Source</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {actionItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {editRows[item.id] ? (
                        <TextField
                          value={item.id.toString()}
                          onChange={(e) =>
                            handleChange(item.id, "id", e.target.value)
                          }
                          fullWidth
                        />
                      ) : (
                        item.id.toString()
                      )}
                    </TableCell>
                    <TableCell>
                      {editRows[item.id] ? (
                        <TextField
                          value={item.locationPath}
                          onChange={(e) =>
                            handleChange(
                              item.id,
                              "locationPath",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
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
                    <TableCell>
                      {editRows[item.id] ? (
                        <TextField
                          value={item.description}
                          onChange={(e) =>
                            handleChange(item.id, "description", e.target.value)
                          }
                          fullWidth
                        />
                      ) : (
                        item.description
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
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
