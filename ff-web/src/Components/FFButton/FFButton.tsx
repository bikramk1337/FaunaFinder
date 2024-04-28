import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React from "react";

interface Props extends ButtonProps {
  name: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const FFButton = (props: Props) => {
  const { name, isLoading, isDisabled } = props;
  return (
    <Button
      variant="contained"
      disableElevation
      disabled={isLoading || isDisabled}
      {...props}
    >
      {isLoading && (
        <CircularProgress size={18} sx={{ mr: 1 }} color="secondary" />
      )}
      {name}
    </Button>
  );
};

export default FFButton;
