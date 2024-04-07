import { Alert, Box, Button, Typography } from "@mui/material";
import React from "react";
import { Logo, LogoText } from "../../Components/Logo";
import { useLogout } from "../../Hooks";
import { useNavigate } from "react-router-dom";

type Props = {};

const LogoutConfirmation = (props: Props) => {
  const handleLogout = useLogout();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      minHeight="100vh"
      sx={{ py: 5 }}
    >
      <Box
        flexGrow={"1"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent="end"
        alignItems="center"
        mb={5}
      >
        <Logo size={100} />
        <LogoText variant="h3" />
      </Box>

      <Box
        display={"flex"}
        justifyContent="center"
        alignItems="start"
        flexGrow={"1"}
        mb={6}
        sx={{ width: 400 }}
      >
        <Alert sx={{ height: 54, width: "100%" }}>
          You are already logged in
        </Alert>
      </Box>

      <Box flexGrow={"1"} textAlign="center" sx={{ width: 400 }}>
        <Box display={"flex"} gap={2}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ height: 54, mb: 2 }}
            disableElevation
            type="button"
            color="secondary"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ height: 54, mb: 2 }}
            disableElevation
            type="button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>
      <Box textAlign="center">
        <Typography variant="subtitle2"></Typography>
      </Box>
    </Box>
  );
};

export default LogoutConfirmation;
