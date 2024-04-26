import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../../Redux/Services/userService";
import { useSelector } from "react-redux";

import {
  resetEditData,
  selectEditData,
  setEditData,
} from "../../Redux/Slices/userSlice";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { RootState } from "../../Redux/store";

type Props = {};

const EditUser = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editData = useSelector((state: RootState) => selectEditData(state));

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleFieldChange = (key: any, value: any) => {
    dispatch(setEditData({ [key]: value }));
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser(editData)
      .unwrap()
      .then(() => {
        dispatch(resetEditData());
        navigate(-1);
      })
      .catch((error) => {
        console.log("add user eror", error);
      });
  };

  return (
    <Box>
      <form onSubmit={handleSave}>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Box mt={4} mb={2}>
              <FormControl fullWidth required>
                <FormLabel>Full name</FormLabel>
                <TextField
                  id="fullName"
                  variant="outlined"
                  placeholder="Enter full name"
                  color="secondary"
                  type="text"
                  value={editData.full_name}
                  onChange={(e) =>
                    handleFieldChange("full_name", e.target.value)
                  }
                  required
                />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl required fullWidth>
                <FormLabel>Email address</FormLabel>
                <TextField
                  id="email"
                  variant="outlined"
                  placeholder="Enter email address"
                  color="secondary"
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  required
                />
              </FormControl>
            </Box>

            <Grid sm={12} lg={6}>
              <Box mb={2}>
                <FormControl required fullWidth>
                  <FormLabel>User type</FormLabel>
                  <TextField
                    id="user_type"
                    select
                    placeholder="Select user type"
                    value={editData.user_type}
                    onChange={(e) =>
                      handleFieldChange("user_type", e.target.value)
                    }
                    color="secondary"
                  >
                    <MenuItem color="secondary" value={"regular"}>
                      Regular
                    </MenuItem>
                    <MenuItem color="secondary" value={"dashboard"}>
                      Dashboard
                    </MenuItem>
                    <MenuItem color="secondary" value={"superuser"}>
                      Superuser
                    </MenuItem>
                  </TextField>
                </FormControl>
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={<Checkbox color="secondary" />}
                  label="Activate user"
                  checked={editData.is_active}
                  onChange={(e) => {
                    handleFieldChange("is_active", !editData.is_active);
                  }}
                  color="secondary"
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Box display={"flex"} justifyContent={"end"} mt={4}>
          <Button
            variant="contained"
            disableElevation
            type="button"
            color="secondary"
            onClick={() => {
              navigate(-1);
            }}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disableElevation
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <CircularProgress size={18} sx={{ mr: 1 }} color="secondary" />
            )}
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditUser;
