import { Box } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import React, { useRef, useState } from "react";
import { useGetGeneralUsersQuery } from "../../Redux/Services/userService";
import { UserTableColumns } from "./UserTableColumns";
import { FFTable } from "../../Components/FFTable";
import { useNavigate } from "react-router-dom";

type Props = {};

const UsersGeneral = (props: Props) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetGeneralUsersQuery();

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

export default UsersGeneral;
