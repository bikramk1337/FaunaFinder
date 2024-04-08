import { Box } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import React, { useRef, useState } from "react";
import { UserTableColumns } from "./UserTableColumns";
import { useGetAdminUsersQuery } from "../../Redux/Services/userService";
import { useNavigate } from "react-router-dom";
import { FFTable } from "../../Components/FFTable";

type Props = {};

const UsersAdmin = (props: Props) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAdminUsersQuery();

  const handleEditClick = (id: GridRowId) => {
    navigate(`/admin/users/edit-user/${id}`);
  };

  const handleDeleteClick = (id: GridRowId) => {};

  if (isError) {
    return <Box>Error</Box>;
  }
  return (
    <Box sx={{ mt: 2 }} style={{ width: "100%" }}>
      <FFTable
        data={data?.data || []}
        columns={UserTableColumns({
          handleEditClick,
          handleDeleteClick,
        })}
        page={1}
        pageSize={10}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default UsersAdmin;
