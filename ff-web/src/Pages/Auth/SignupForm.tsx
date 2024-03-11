import {
  Box,
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

const SignupForm = (props: Props) => {
  const navigate = useNavigate();
  return (
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
            navigate("../login");
          }}
        >
          Sign up
        </Button>
      </Box>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography>
          Don't have an account? <Link to="../login">Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupForm;
