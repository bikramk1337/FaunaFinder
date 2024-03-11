import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Logo = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ bgcolor: "red", cursor: "pointer" }}
      onClick={() => {
        navigate("/");
      }}
    >
      Logo
    </Box>
  );
};

export default Logo;
