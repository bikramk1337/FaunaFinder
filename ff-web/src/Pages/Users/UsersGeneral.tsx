import { Box } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import React, { useRef, useState } from "react";
import { useGetGeneralUsersQuery } from "../../Redux/Services/userService";
import { UserTableColumns } from "./UserTableColumns";
import { FFTable } from "../../Components/FFTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetEditData, setEditData } from "../../Redux/Slices/userSlice";
import { IUser } from "../../Types";
import DeleteUserDialog from "./DeleteUserDialog";

type Props = {};

const UsersGeneral = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetGeneralUsersQuery();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditClick = (row: IUser) => {
    dispatch(setEditData(row));
    navigate(`/admin/users/edit-user/${row.id}`);
  };

  const handleDeleteClick = (row: IUser) => {
    dispatch(setEditData(row));
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    dispatch(resetEditData());
    setShowDeleteModal(false);
  };

  const handleDeleteUser = () => {};

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
      {showDeleteModal && (
        <DeleteUserDialog
          open={showDeleteModal}
          handleClose={handleDeleteModalClose}
          handleDelete={handleDeleteUser}
        />
      )}
    </Box>
  );
};

export default UsersGeneral;
