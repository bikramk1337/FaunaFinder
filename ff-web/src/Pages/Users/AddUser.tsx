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
import FFButton from "../../Components/FFButton/FFButton";
import FFTextInput from "../../Components/FFTextInput/FFTextInput";

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
        navigate("/admin/users");
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
              <FormControl fullWidth>
                <FormLabel>Full name</FormLabel>
                <TextField
                  id="fullName"
                  variant="outlined"
                  placeholder="Enter full name"
                  type="text"
                  value={editData.full_name}
                  onChange={(e) =>
                    setEditData({ ...editData, full_name: e.target.value })
                  }
                  required
                  autoFocus
                />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FFTextInput
                fullWidth
                formLabel="Email address"
                id="email"
                placeholder="Enter email address"
                type="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                required
              />
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <FormLabel>Password</FormLabel>
                <TextField
                  id="password"
                  variant="outlined"
                  placeholder="Enter password"
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
                <FormControl fullWidth>
                  <FormLabel>User type</FormLabel>
                  <TextField
                    id="user_type"
                    select
                    placeholder="Select user type"
                    value={editData.user_type}
                    onChange={(e) =>
                      setEditData({ ...editData, user_type: e.target.value })
                    }
                  >
                    <MenuItem value={"regular"}>Regular</MenuItem>
                    <MenuItem value={"dashboard"}>Dashboard</MenuItem>
                    <MenuItem value={"superuser"}>Superuser</MenuItem>
                  </TextField>
                </FormControl>
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Activate user"
                  checked={editData.is_active}
                  onChange={(e) => {
                    setEditData({
                      ...editData,
                      is_active: !editData.is_active,
                    });
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Box display={"flex"} justifyContent={"end"} mt={4}>
          <FFButton
            type="button"
            color="secondary"
            onClick={() => {
              navigate(-1);
            }}
            sx={{ mr: 1 }}
            name="Cancel"
          />

          <FFButton type="submit" isLoading={isLoading} name="Save" />
        </Box>
      </form>
    </Box>
  );
};

export default AddUser;
