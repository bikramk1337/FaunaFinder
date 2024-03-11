import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

const LoginForm = (props: Props) => {
  const navigate = useNavigate();
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
            onClick={() => {
              navigate("/admin");
            }}
          >
            Login
          </Button>
        </Box>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography>
            Don't have an account? <Link to="../signup">Sign up</Link>
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Divider>OR</Divider>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Button sx={{ height: 54 }} variant="outlined" size="large" fullWidth>
          Login with google
        </Button>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Button sx={{ height: 54 }} variant="outlined" size="large" fullWidth>
          Login with github
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
