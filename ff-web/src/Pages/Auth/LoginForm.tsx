import {
  Alert,
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../Redux/Slices/authSlice";
import { useLoginMutation } from "../../Redux/Services/loginService";

type Props = {};

const mailto = "mailto:no-reply@example.com";

const LoginForm = (props: Props) => {
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLoginClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({ username: email, password: password })
      .unwrap()
      .then(() => {
        navigate("/admin");
      })
      .catch((error) => {
        console.log("login eror", error);
      });
  };
  return (
    <Box>
      {isError && (
        <Box sx={{ height: 54, mb: 2 }}>
          <Alert severity="error">Error placeholder</Alert>
        </Box>
      )}

      <Box>
        <form id="login-form" onSubmit={handleLoginClick}>
          <Box>
            <FormControl fullWidth sx={{ height: 54, mb: 2 }}>
              <TextField
                id="email"
                variant="outlined"
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth sx={{ height: 54, mb: 4 }}>
              <TextField
                id="password"
                variant="outlined"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
          </Box>
          <Box>
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ height: 54, mb: 2 }}
              disableElevation
              type="submit"
            >
              Login
            </Button>
          </Box>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography>
              Don't have an account?{" "}
              <Link
                to="#"
                onClick={(e) => {
                  window.location.href = mailto;
                  e.preventDefault();
                }}
              >
                Contact administrator
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
