import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import FFButton from "../../Components/FFButton/FFButton";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  isLoading: boolean;
  isError: boolean;
};

const DeleteSpeciesDialog = (props: Props) => {
  const { open, handleClose, handleDelete, isLoading, isError } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete fauna</DialogTitle>
      {isError && (
        <Box sx={{ height: 54 }}>
          <Alert severity="error">
            Fauna could not be deleted. Please try again.
          </Alert>
        </Box>
      )}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this fauna? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <FFButton
          name="Cancel"
          // color="secondary"
          onClick={handleClose}
          isDisabled={isLoading}
          autoFocus
        />
        <FFButton
          name="Delete"
          onClick={handleDelete}
          isLoading={isLoading}
          color="error"
        >
          Delete
        </FFButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteSpeciesDialog;
