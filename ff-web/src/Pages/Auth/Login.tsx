import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import LoginForm from "./LoginForm";
import Logo from "../../Components/Logo";

type Props = {};

const Login = (props: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      minHeight="100vh"
      sx={{ py: 5 }}
    >
      {/* <Box sx={{ width: 400 }}> */}
      <Logo />
      <Box textAlign="center" sx={{ width: 400 }}>
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome back
        </Typography> */}
        {/* <Paper variant="outlined" sx={{ p: 4 }}> */}
        <LoginForm />
        {/* </Paper> */}
      </Box>
      <Box textAlign="center">
        <Typography variant="subtitle2">{new Date().getFullYear()}</Typography>
      </Box>
      {/* </Box> */}
    </Box>
  );
};

export default Login;
