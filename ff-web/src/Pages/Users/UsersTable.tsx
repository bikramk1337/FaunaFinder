import { Box } from "@mui/material";
import React, { useState } from "react";
import { UserTableColumns } from "./UserTableColumns";
import { useGetUsersQuery } from "../../Redux/Services/userService";
import { useNavigate } from "react-router-dom";
import { FFTable } from "../../Components/FFTable";
import { IUser } from "../../Types";

type Props = {};

const UsersTable = (props: Props) => {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(100);

  const { data, isLoading, isError } = useGetUsersQuery({
    skip: 0,
    limit: 100,
  });

  const handleEditClick = (row: IUser) => {
    navigate(`/admin/users/edit-user/${row.id}`);
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
        })}
        page={page}
        pageSize={pageSize}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default UsersTable;
