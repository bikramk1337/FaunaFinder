import React from "react";
import { FFTopNav } from "../../Components/Navigation";
import { userRoutes } from "../../Routes";
import { Box, Button, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

type Props = {};

const Users = (props: Props) => {
  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Typography variant="h5">Users</Typography>
        <Button variant="contained" color="secondary" size="large">
          + Add New
        </Button>
      </Box>

      <FFTopNav navList={userRoutes} />
      <Outlet />
    </Box>
  );
};

export default Users;
