import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import Logo from "../../Components/Logo";
import SignupForm from "./SignupForm";

type Props = {};

const Register = (props: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      minHeight="100vh"
      sx={{ py: 10 }}
    >
      {/* <Box sx={{ width: 400 }}> */}
      <Logo />
      {/* <Typography>Welcome</Typography> */}
      {/* <Paper variant="outlined" sx={{ p: 4 }}> */}
      <Box textAlign="center" sx={{ width: 400 }}>
        <SignupForm />
      </Box>
      {/* </Paper> */}
      {/* </Box> */}
      <Box textAlign="center"></Box>
    </Box>
  );
};

export default Register;
