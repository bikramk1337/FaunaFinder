import {
  Box,
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

type Props = {};

const LoginForm = (props: Props) => {
  const { login } = useAuth();

  const handleLoginClick = () => {
    login();
  };
  return (
    <Box>
      <Box>
        <Box>
          <FormControl fullWidth sx={{ height: 54, mb: 2 }}>
            <TextField id="email" variant="outlined" label="Email address" />
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth sx={{ height: 54, mb: 4 }}>
            <TextField id="password" variant="outlined" label="Password" />
          </FormControl>
        </Box>
        <Box>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ height: 54, mb: 2 }}
            disableElevation
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </Box>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          {/* <Typography>
            Don't have an account? <Link to="../signup">Sign up</Link>
          </Typography> */}
          <Typography>Don't have an account? Contact administrator</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
