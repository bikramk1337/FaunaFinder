import React from "react";
import { useGetFaunaQuery } from "../../Redux/Services/speciesService";
import {
  Autocomplete,
  Box,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import FFTextInput from "../../Components/FFTextInput/FFTextInput";
import { Cancel, Search } from "@mui/icons-material";
import FaunaListItem from "./FaunaListItem";

type Props = {};

const FaunaList = (props: Props) => {
  const { data, isLoading, isError } = useGetFaunaQuery();
  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={4}
      >
        <Typography variant="h5" flex={2}>
          Species
        </Typography>
        <Box flex={1}>
          <Autocomplete
            freeSolo
            id="fauna-search"
            disableClearable
            options={[]}
            renderInput={(params) => (
              <FFTextInput
                {...params}
                type="search"
                fullWidth
                placeholder="Search"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Cancel />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }} style={{ width: "100%" }}>
        {isError ? (
          <Box>Error</Box>
        ) : isLoading ? (
          <Box>Loading...</Box>
        ) : (
          <Grid container spacing={2}>
            {data?.data &&
              data.data.map((fauna) => {
                return <FaunaListItem fauna={fauna} key={fauna.id} />;
              })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default FaunaList;
