import { Box } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import React, { useRef, useState } from "react";
import { UserTableColumns } from "./UserTableColumns";
import { useGetAdminUsersQuery } from "../../Redux/Services/userService";
import { useNavigate } from "react-router-dom";
import { FFTable } from "../../Components/FFTable";
import { useDispatch } from "react-redux";
import { setEditData } from "../../Redux/Slices/userSlice";
import { IUser } from "../../Types";

type Props = {};

const UsersAdmin = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetAdminUsersQuery();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditClick = (row: IUser) => {
    dispatch(setEditData(row));
    navigate(`/admin/users/edit-user/${row.id}`);
  };

  const handleDeleteClick = (row: IUser) => {
    dispatch(setEditData(row));
    setShowDeleteModal(true);
  };

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
