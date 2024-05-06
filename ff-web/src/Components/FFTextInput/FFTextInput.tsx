import {
  FormControl,
  FormLabel,
  StandardTextFieldProps,
  TextField,
} from "@mui/material";
import React from "react";

interface Props extends StandardTextFieldProps {
  formLabel?: string;
  fullWidth?: boolean;
}

const FFTextInput = (props: Props) => {
  return (
    <FormControl fullWidth={props.fullWidth === false ? false : true}>
      {props.formLabel && <FormLabel>{props.formLabel}</FormLabel>}
      <TextField variant="outlined" {...props} />
    </FormControl>
  );
};

export default FFTextInput;
