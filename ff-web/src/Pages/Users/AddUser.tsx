import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { FormEvent, FormEventHandler, useState } from "react";
import { IUser, IUserCreate } from "../../Types";
import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../../Redux/Services/userService";

type Props = {};

const AddUser = (props: Props) => {
  const navigate = useNavigate();

  const [addUser, { isLoading, isError }] = useAddUserMutation();

  const initialEditData: IUserCreate = {
    full_name: "",
    email: "",
    email_verified: false,
    user_type: "dashboard",
    id: 0,
    is_active: true,
    password: "",
  };

  const [editData, setEditData] = useState<IUserCreate>(initialEditData);

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser(editData)
      .unwrap()
      .then(() => {
        setEditData(initialEditData);
        navigate("-1");
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
                    setEditData({ ...editData, full_name: e.target.value })
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
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  required
                />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl required fullWidth>
                <FormLabel>Password</FormLabel>
                <TextField
                  id="password"
                  variant="outlined"
                  placeholder="Enter password"
                  color="secondary"
                  type="password"
                  value={editData.password}
                  onChange={(e) =>
                    setEditData({ ...editData, password: e.target.value })
                  }
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
                      setEditData({ ...editData, user_type: e.target.value })
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
                    setEditData({
                      ...editData,
                      is_active: !editData.is_active,
                    });
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

export default AddUser;
