import React, { RefObject } from "react";
import {
  GridActionsCellItem,
  GridActionsCellItemProps,
  GridCellParams,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { generateAvatar } from "../../Helpers";
import { MoreVert } from "@mui/icons-material";
import { IUser } from "../../Types";

function DeleteUserActionItem({
  deleteUser,
  ...props
}: GridActionsCellItemProps & { deleteUser: () => void }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <GridActionsCellItem {...props} onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this user?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setOpen(false);
              deleteUser();
            }}
            color="warning"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export const UserTableColumns = ({
  handleEditClick,
  handleDeleteClick,
}: {
  handleEditClick: (row: IUser) => void;
  handleDeleteClick: (row: IUser) => void;
}) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      sortable: true,
      width: 80,
    },
    {
      field: "full_name",
      headerName: "Full name",
      flex: 1,
      sortable: true,
      renderCell: (params) => {
        return (
          <Stack
            direction="row"
            spacing={1}
            alignItems={"center"}
            height={"100%"}
          >
            {params.value ? (
              <>
                <Avatar {...generateAvatar(params.value)} />
                <Typography>{params.value}</Typography>
              </>
            ) : (
              <Typography variant="body2">N/A</Typography>
            )}
          </Stack>
        );
      },
    },
    {
      field: "email",
      headerName: "Email address",
      flex: 1,
      sortable: true,
    },
    {
      field: "Status",
      headerName: "Status",
      sortable: false,
      flex: 1,
      renderCell: (params: GridCellParams) => {
        const { is_active, email_verified } = params.row;
        return (
          <Stack
            direction="row"
            spacing={1}
            alignItems={"center"}
            height={"100%"}
          >
            <Chip
              label={is_active ? "Active" : "Inactive"}
              variant="outlined"
              color={is_active ? "success" : "error"}
              size="small"
            />
            <Chip
              label={email_verified ? "Verified" : "Verification required"}
              variant="outlined"
              color={email_verified ? "info" : "warning"}
              size="small"
            />
          </Stack>
        );
      },
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          label="Edit"
          onClick={() => {
            handleEditClick(params.row);
          }}
          showInMenu
        />,
        <GridActionsCellItem
          label="Delete"
          onClick={() => handleDeleteClick(params.row)}
          showInMenu
        />,
      ],
    },
  ];

  return columns;
};
