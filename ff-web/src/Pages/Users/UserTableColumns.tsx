import React from "react";
import {
  GridActionsCellItem,
  GridCellParams,
  GridColDef,
} from "@mui/x-data-grid";
import { Avatar, Chip, Stack, Typography } from "@mui/material";
import { generateAvatar } from "../../Helpers";
import { IUser } from "../../Types";

export const UserTableColumns = ({
  handleEditClick,
}: {
  handleEditClick: (row: IUser) => void;
}) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      sortable: true,
      width: 80,
      sortingOrder: ["asc", "desc"],
    },
    {
      field: "full_name",
      headerName: "Full name",
      flex: 1,
      sortable: true,
      sortingOrder: ["asc", "desc"],
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
      sortingOrder: ["asc", "desc"],
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
      ],
    },
  ];

  return columns;
};
