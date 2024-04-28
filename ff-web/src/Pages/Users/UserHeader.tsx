import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { userTabRoutes } from "../../Routes";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const UserHeader = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddUserClick = () => {
    navigate("/admin/users/add-user");
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const CancelButton = (
    <Button
      variant="contained"
      disableElevation
      color="secondary"
      onClick={handleCancelClick}
    >
      Cancel
    </Button>
  );

  const AddButton = (
    <Button
      variant="contained"
      disableElevation
      color="primary"
      onClick={handleAddUserClick}
    >
      + Add User
    </Button>
  );

  const Title = ({ name }: { name: string }) => (
    <Typography variant="h5">{name}</Typography>
  );

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={2}
    >
      {location.pathname.includes("add-user") ? (
        <>
          <Title name={"Add user"} />
          {CancelButton}
        </>
      ) : location.pathname.includes("edit-user") ? (
        <>
          <Title name={"Edit user"} />
          {CancelButton}
        </>
      ) : (
        <>
          <Title name={"Users"} />
          {AddButton}
        </>
      )}
    </Box>
  );
};

export default UserHeader;
