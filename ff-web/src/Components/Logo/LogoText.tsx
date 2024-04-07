import { Box, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import React from "react";

type Props = {
  variant: Variant;
};

const LogoText = (props: Props) => {
  const { variant } = props;
  return (
    <Box>
      <Typography variant={variant} fontFamily={"Madimi One"}>
        Fauna Finder
      </Typography>
    </Box>
  );
};

export default LogoText;
