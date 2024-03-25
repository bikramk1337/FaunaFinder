import { Box, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import { Logo, LogoText } from "../../Components/Logo";

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
      <Box
        flexGrow={"1"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
      >
        <Logo size={100} />
        <LogoText variant="h3" />
      </Box>

      <Box flexGrow={"1"} textAlign="center" sx={{ width: 400 }}>
        <LoginForm />
      </Box>
      <Box textAlign="center">
        <Typography variant="subtitle2">{new Date().getFullYear()}</Typography>
      </Box>
    </Box>
  );
};

export default Login;
